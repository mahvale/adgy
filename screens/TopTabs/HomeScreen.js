import React,{useRef,useState,useEffect} from 'react';
import { View, Text,Image,TouchableOpacity,StyleSheet,Dimensions,FlatList,ScrollView,SafeAreaViewBase,SafeAreaView,Animated,StatusBar  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {auth, db,dbstorage, ref, query, orderByChild, equalTo, get, set, signInWithEmailAndPassword, createUserWithEmailAndPassword,refdb,storageFile,onValue,push,serverTimestamp,onAuthStateChanged,signOut,uploadBytes,getDownloadURL,app,listAll,limitToLast,doc,setDoc,addDoc,collection,getDocs,onSnapshot,orderBy,where} from '../../firebase'


import { TextInput, IconButton } from 'react-native-paper';

const { height, width } = Dimensions.get('window')
const  BureauScreen = ({navigation}) => {
   const [users, setUsers] = useState([]);

const [searchQuery, setSearchQuery] = useState('');

const scrollY = useRef(new Animated.Value(0)).current;

useEffect(() => {
  // Référence à la collection 'users' dans Firestore
  const usersCollection = collection(dbstorage, 'users');
  
  // Créer une requête pour filtrer les utilisateurs dont le champ 'status' n'est pas vide
  const q = query(usersCollection, where('status', '!=', ''));

  // Écoute en temps réel des changements dans la collection
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    setUsers(data);
  });

  // Nettoyage de l'écoute en temps réel lors du démontage du composant
  return () => unsubscribe();
}, []);

 
 const filteredData = users.filter(item => 
    item.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const BG_IMG = require('../../assets/favicon.png')
  const SPACING = 20
  const AVATAR_SIZE = 70
  const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

 const renderItem = ({ item,index }) => {

    const inputRange = [-1,0,ITEM_SIZE  * (index),ITEM_SIZE  * (index + 2), ]

    const opacityInputRange = [-1, 0,ITEM_SIZE  * index,ITEM_SIZE  * (index + .5),]

      const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1,1,1,0],
          });

      const opacity = scrollY.interpolate({
            inputRange:opacityInputRange,
            outputRange: [1,1,1,0],
          });

    return (
    <Animated.View style={{
      flexDirection: 'row',
      padding:SPACING / 2,
      marginBottom:SPACING,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius:14,
      shadowColor: '#000',
      marginHorizontal:10,
          shadowOffset: {
            width: 0,
            height: 10
          },
          shadowOpacity: .5,
          shadowRadius: 20,
          opacity,
          transform:[{scale}]
       }}>
      <Image source={{ uri: item.profileImageUrl }} style={{
        width:AVATAR_SIZE,
        height:AVATAR_SIZE,
        borderRadius: AVATAR_SIZE,
        marginRight:SPACING / 2
      }} />

      <TouchableOpacity onPress={()=>{navigation.navigate('Profile',{
        status:item.status,
        image:item.profileImageUrl,
        name:item.nom,
        numero:item.numero,
        email:item.email,
        numero:item.numero
      })}}>
        <Text style={{fontSize: 22,fontWeight:'700' }} >{item.nom}</Text>
        <Text style={{fontSize:18,opacity: .7}} > {item.numero} </Text>
        <Text style={{fontSize:14,opacity: .8,color: '#0099cc'}} > {item.status} </Text>
      </TouchableOpacity>
    </Animated.View>

      )

  }

  return (
    <View style={styles.container}>
    <TextInput
        label="Search"
        mode="outlined"
        value={searchQuery}
        onChangeText={text => setText(text)}
        left={<TextInput.Icon name="magnify" />}
        onChangeText={query => setSearchQuery(query)}
        style={{marginHorizontal:10,marginBottom:SPACING}}
      />
    <Image
      source={BG_IMG}
      style={StyleSheet.absoluteFillObject}
      blurRadius={80} 
      />
      <Animated.FlatList
       data={filteredData}
        renderItem={renderItem}
        contentContaonerStyle={{ padding:SPACING,paddingTop:StatusBar.currentHeight || 42 }}
         onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width: 170,
    fontFamily:"Roboto",
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
    fontFamily:"Roboto",
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
    fontFamily:"Roboto",
  },
    shadow:{
    shadowOffset: {
      width:0,
      height:3
    },
    shadowRadius:2,
    shadowColor:'#236742',
    shadowOpacity: 0.50,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})



export default BureauScreen