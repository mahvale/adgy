import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal, Button, ScrollView, ImageBackground, Alert, ActivityIndicator } from 'react-native';

import { ref as storageRef } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import { auth, db,dbstorage, ref, query, orderByChild, equalTo, get, set, signInWithEmailAndPassword, createUserWithEmailAndPassword,refdb,storageFile,onValue,push,serverTimestamp,onAuthStateChanged,signOut,uploadBytes,getDownloadURL,app,listAll,limitToLast,doc,setDoc,addDoc,collection,getDocs} from '../firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function App({ navigation }) {
    const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [titre, setTitre] = useState('');
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  fetchGalleryImages();
}, []);

   const fetchGalleryImages = async () => {
    try {
      // Référence à la collection 'gallery' dans Firestore
      const galleryCollection = collection(dbstorage, 'gallery');

      // Récupération des documents de la collection
      const gallerySnapshot = await getDocs(galleryCollection);

      // Formatage des données pour les stocker dans un tableau
      const imagesArray = gallerySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Mise à jour de l'état avec les images récupérées
      setImages(imagesArray);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    }
  };

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

  const uploadImage = async (uri, title, description) => {
    setLoading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageReference = storageRef(storageFile, `${title}/${Date.now()}.jpg`);
      await uploadBytes(storageReference, blob);
      const downloadURL = await getDownloadURL(storageReference);
      saveImageMetadata(downloadURL, title, description);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erreur de connexion', 'Impossible de télécharger l\'image. Veuillez vérifier votre connexion.');
    }
  };

const saveImageMetadata = async (imageURL, title, description) => {
  try {
    // Référence à la collection 'gallery' dans Firestore
    const galleryCollection = collection(dbstorage, 'gallery');
    
    // Nouvel objet image à ajouter
    const newImage = {
      url: imageURL,
      title: title || 'Untitled',
      description: description || 'No description',
      date: new Date().toISOString(),
    };
    
    // Ajout du document à la collection 'gallery'
    await addDoc(galleryCollection, newImage);
    fetchGalleryImages()
    console.log('Image metadata saved successfully!');
  } catch (error) {
    console.error('Error saving image metadata:', error);
  }
};

  const handleUpload = async () => {
    await uploadImage(selectedImage, titre, description);
    setModalVisible(false);
    setSelectedImage(null);
    setTitre(''); 
    setDescription('');
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetailsGalery', { nom: item.title, img: item.url })} style={styles.itemContainer}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.count}>{item.description}</Text>
    </TouchableOpacity>
  );
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerText}>Gallery</Text>
        <Ionicons name="camera" size={24} color="black" />
      </View>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity  onPress={() => setModalVisible(true)}  style={styles.floatingButton}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

       <Modal
        animationType="slide"
        transparent={true} 
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedImage(null);
        }}
      >
        <View style={styles.modalView}>
          <ScrollView>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={pickImage}>
                {selectedImage ? (
                  <Image source={{ uri: selectedImage }} style={[styles.profileImage, { marginBottom: 50 }]} />
                ) : (
                  <Image source={require('../assets/photo.png')} style={styles.profileImage2} />
                )}
              </TouchableOpacity>
              <TextInput
                placeholder="Titre"
                value={titre}
                onChangeText={(value) => setTitre(value)}
                style={styles.input}
              />
              <TextInput
                placeholder="Description"
                value={description}
                onChangeText={(value) => setDescription(value)}
                style={styles.input}
              />
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#3cc154" />
            ) : (
              <>
                <Button title="Ajouter Images" onPress={handleUpload} color="#3cc154" />
                <Button title="Fermer" style={{ marginTop: 10 }} onPress={() => setModalVisible(false)} color="red" />
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  count: {
    color: '#888',
    textAlign:'center'
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#3cc154',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    borderColor: '#3cc154',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  addButton: {
    padding: 15,
    backgroundColor: '#3cc154',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 10, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backButton: {
    backgroundColor: '#206646',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  newGalleryText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Roboto',
    marginLeft: 10,
  },
  imageTitle: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  imageDescription: {
    color: '#555',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImage2: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
});
