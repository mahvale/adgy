import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, FlatList, Alert, StatusBar } from 'react-native';
import { auth, db,dbstorage, ref, query, orderByChild, equalTo, get, set, signInWithEmailAndPassword, createUserWithEmailAndPassword,refdb,storageFile,onValue,push,serverTimestamp,onAuthStateChanged,signOut,uploadBytes,getDownloadURL,app,listAll,limitToLast,doc,setDoc,addDoc,collection,getDocs  } from '../firebase';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

const { width: screenWidth } = Dimensions.get('window');

const data = [
  { id: '1', uri: require('../assets/about.jpg') },
  { id: '2', uri: require('../assets/about13.jpg') },
  { id: '3', uri: require('../assets/about5.jpg') },
  { id: '4', uri: require('../assets/about6.jpg') },
];

const Drawer = ({ navigationItems }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-screenWidth * 0.75)).current;
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    Animated.timing(drawerAnim, {
      toValue: drawerOpen ? -screenWidth * 0.75 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    AsyncStorage.getItem('user').then((value) => {
      if (value != null) {
        let user = JSON.parse(value);
        setProfileImage(user.profileImageUrl);
        setNom(user.nom);
        setPrenom(user.prenom);
        setEmail(user.email);
        setStatus(user.status);
      }
    });
  }, []);

  return (
    <>
      <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}>
        <View style={styles.drawerHeader}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <Text style={styles.drawerHeaderText}>{nom} {prenom}</Text>
        </View>
        <Text style={styles.drawerEmailText}>{status} {email}</Text>
        {navigationItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={item.onPress} style={styles.menuItem}>
            <Ionicons name={item.icon} color='#206646' size={22} />
            <Text style={styles.menuItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      <View style={[styles.overlay, { backgroundColor: drawerOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }]} pointerEvents={drawerOpen ? 'auto' : 'none'}>
        <TouchableOpacity style={styles.overlay} onPress={toggleDrawer} />
      </View>
      <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
        <Ionicons name={drawerOpen ? "close" : "list-sharp"} size={34} color="#fff" />
      </TouchableOpacity>
    </>
  );
};

const App = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [news, setNews] = useState([]);
  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    const interval = Animated.loop(
      Animated.sequence([
        Animated.timing(scrollX, {
          toValue: screenWidth * (carouselData.length - 1),
          duration: 3000 * carouselData.length,
          useNativeDriver: true,
        }),
        Animated.timing(scrollX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    interval.start();

    return () => interval.stop();
  }, [scrollX]);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: value, animated: false });
      }
    });

    return () => scrollX.removeAllListeners();
  }, [scrollX]);

  useEffect(() => {
   const fetchNews = async () => {
  try {
    // Référence à la collection 'news' dans Firestore
    const newsCollection = collection(dbstorage, 'news');
    
    // Récupérer les documents de la collection
    const newsSnapshot = await getDocs(newsCollection);
    
    // Formater les données récupérées
    const formattedData = newsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    setNews(formattedData);
  } catch (error) {
    console.error('Error fetching news:', error);
    Alert.alert("Erreur lors de la récupération des nouvelles");
  }
};
fetchNews();
  }, []);

  useEffect(() => {
    const fetchProgrammes = async () => {
       try {
    // Référence à la collection 'news' dans Firestore
    const newsCollection = collection(dbstorage, 'programmes');
    
    // Récupérer les documents de la collection
    const newsSnapshot = await getDocs(newsCollection);
    
    // Formater les données récupérées
    const formattedData = newsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    setProgrammes(formattedData);
  } catch (error) {
    console.error('Error fetching programmes:', error);
    Alert.alert("Erreur lors de la récupération des nouvelles");
  }
    };
    fetchProgrammes();
  }, []);

  const navigationItems = [
    { label: 'À Propos', onPress: () => navigation.navigate('About'), icon: 'home-outline' },
    { label: 'Programme et Activités', onPress: () => navigation.navigate('Programme'), icon: 'calendar' },
    { label: 'Galerie', onPress: () => navigation.navigate('Galery'), icon: 'images-sharp' },
    { label: 'Discussion', onPress: () => navigation.navigate('Suggestion'), icon: 'chatbubbles-sharp' },
    { label: 'Déconnexion', onPress: () => navigation.navigate('Deconnexion'), icon: 'close-circle' },
  ];

  return (
    <View style={styles.container}>
      <Drawer navigationItems={navigationItems} />
      <View style={{flexDirection:'column' }} >
       <Swiper
      style={styles.wrapper}
      showsPagination={true}
      autoplay={true}
    >
      {data.map((item) => (
        <View key={item.id} style={styles.slide}>
          <Image source={item.uri} style={styles.image} />
        </View>
      ))}
    </Swiper>
      <View style={styles.header}>
        <Animatable.View
          animation="slideInLeft"
          iterationCount="infinite"
          direction="alternate"
          duration={10000}
          style={styles.textContainer}
        >
          <Animatable.Text style={styles.textAnimated}>
            Association de Développement du Groupement Yemessomo
          </Animatable.Text>
        </Animatable.View>
      </View>
      </View>
     
      <ScrollView contentContainerStyle={styles.scrollContainer} style={{ marginTop:95 }}>
        <Text style={styles.sectionTitle}>Informations Récentes</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={news}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.infoCard}
              onPress={() => navigation.navigate('DetailsInfos', {
                image: item.imageUrl,
                title: item.title,
                date: item.date,
                content: item.content,
              })}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.infoCardImage} />
              <View style={styles.infoCardContent}>
                <Text style={styles.infoCardTitle}>{item.title}</Text>
                <Text style={styles.infoCardDate}>{item.date}</Text>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.infoCardText}>
                  {item.content}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.sectionTitle}>Programmes & Activites</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={programmes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.programmeCard}
              onPress={() => navigation.navigate('DetailsProgramme', {
                image: item.imageUrl,
                title: item.title,
                date: item.date,
                time: item.time,
                location: item.location,
                description: item.description,
              })}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.programmeCardImage} />
              <View style={styles.programmeCardContent}>
                <Text style={styles.programmeCardTitle}>{item.title}</Text>
                <Text style={styles.programmeCardDate}>{item.date}</Text>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.programmeCardText}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth * 0.75,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 42,
    zIndex: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 40,
    marginRight: 46,
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  drawerEmailText: {
    fontSize: 16,
    paddingLeft: 16,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 15,
    backgroundColor: '#206646',
    padding: 10,
    borderRadius: 50,
  },
  carousel: {
    height: screenWidth * 0.6,
  },
  carouselItem: {
    width: screenWidth,
    height: 250,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    backgroundColor: '#206646',
    padding: 16,
    alignItems: 'center',
    position: 'relative',
    top:0,
  },
  textContainer: {
    flexDirection: 'row',
  },
  textAnimated: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    width:'100%'
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#286747',
    fontFamily: 'Roboto'
  },
  infoCard: {
    marginRight: 16,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  infoCardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  infoCardContent: {
    padding: 10,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCardDate: {
    fontSize: 14,
    color: '#999',
  },
  infoCardText: {
    fontSize: 14,
    color: '#333',
  },
  programmeCard: {
    marginRight: 16,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  programmeCardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  programmeCardContent: {
    padding: 10,
  },
  programmeCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  programmeCardDate: {
    fontSize: 14,
    color: '#999',
  },
  programmeCardText: {
    fontSize: 14,
    color: '#333',
  },
   wrapper: {},
  slide: {
    flex: 1,
  },
  image: {
    width: screenWidth,
    height: 300,
    resizeMode: 'cover',
  },
});


export default App;
