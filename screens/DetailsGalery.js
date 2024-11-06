import { useEffect, useState, useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Modal, Button, Dimensions } from 'react-native';

import { auth, db,dbstorage, ref, query, orderByChild, equalTo, get, set, signInWithEmailAndPassword, createUserWithEmailAndPassword,refdb,storageFile,onValue,push,serverTimestamp,onAuthStateChanged,signOut,uploadBytes,getDownloadURL,app,listAll,limitToLast,doc,setDoc,addDoc,collection,getDocs } from '../firebase';

import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { height, width } = Dimensions.get('window');

const Test = ({ route, navigation }) => {
   const { nom } = route.params;
  const [newsData, setNewsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const topRef = useRef();
  const thumpRef = useRef();
  const IMG_SIZE = 80;
  const SPACING = 10;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderRef = ref(storageFile, `/${nom}`);
        const result = await listAll(folderRef);
        const urls = await Promise.all(result.items.map(itemRef => getDownloadURL(itemRef)));
        setNewsData(urls);
      } catch (error) {
        console.error('Erreur lors de la récupération des images:', error);
      }
    };

    fetchImages();
  }, [nom]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (selectedImage) {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const storageRef = ref(storageFile, `/${nom}/${Date.now()}.jpg`);

      try {
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        setNewsData([...newsData, downloadURL]);
        setModalVisible(false);
        setSelectedImage(null);
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
      }
    }
  };

  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * (IMG_SIZE + SPACING) - IMG_SIZE / 2 > width / 2) {
      thumpRef?.current?.scrollToOffset({
        offset: index * (IMG_SIZE + SPACING) - width / 2 + IMG_SIZE / 2,
        animated: true,
      });
    } else {
      thumpRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ width, height }}>
        <Image source={{ uri: item }}  style={[StyleSheet.absoluteFillObject,{resizeMode: 'cover'}]} />
      </View>
    );
  };

  const renderItem2 = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
        <Image source={{ uri: item }} style={{
          width: IMG_SIZE,
          height: IMG_SIZE,
          borderRadius: 12,
          marginRight: SPACING,
          borderWidth: 4,
          borderColor: activeIndex === index ? '#fff' : 'transparent',
           resizeMode:"stretch"
        }} 
         resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-sharp" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.newGalleryText}>Album {nom}</Text>
      </View>

      <FlatList
        data={newsData}
        ref={topRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={ev => {
          scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item}
      />

      <FlatList
        data={newsData}
        ref={thumpRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem2}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        style={{ position: 'absolute', bottom: IMG_SIZE }}
        keyExtractor={item => item}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter une image</Text>
            <Button title="Choisir une image" onPress={pickImage} />
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.previewImage} />}
            <View style={{flexDirection: 'row',justifyContent: 'space-around',marginTop:10  }} >
               <Button title="Annuler" onPress={() => setModalVisible(false)} />
               <Button title="Télécharger" style={{marginLeft:10}} onPress={uploadImage} disabled={!selectedImage} />
            </View>
           
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1f1f1f',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    marginRight: 10,
  },
  addButton: {
    marginRight: 10,
  },
  newGalleryText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default Test;
