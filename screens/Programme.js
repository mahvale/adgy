import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image, Modal, TextInput,ScrollView } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import { auth, db,dbstorage, ref, query, orderByChild, equalTo, get, set, signInWithEmailAndPassword, createUserWithEmailAndPassword,refdb,storageFile,onValue,push,serverTimestamp,onAuthStateChanged,signOut,uploadBytes,getDownloadURL,app,listAll,limitToLast,doc,setDoc,addDoc,collection,getDocs } from '../firebase';

const HomeScreen = ({navigation}) => {
  const [newsList, setNewsList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchNews();
      }, []);

 const fetchNews = async () => {
    try {
      // Référence à la collection 'news' dans Firestore
      const newsCollection = collection(dbstorage, 'programmes');
      
      // Récupération des documents de la collection
      const newsSnapshot = await getDocs(newsCollection);
      
      // Formatage des données pour les stocker dans un tableau
      const formattedData = newsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNewsList(formattedData);
    } catch (error) {
      console.error('Error fetching news:', error);
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
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUploadImage = async () => { 
    if (!imageUri) return null;

    setUploading(true);
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = `${new Date().getTime()}-${imageUri.split('/').pop()}`;
    const imageRef = ref(storageFile, `images/${filename}`);

    await uploadBytes(imageRef, blob);
    const downloadUrl = await getDownloadURL(imageRef);
    setUploading(false);
    return downloadUrl;
  };

  const addNews = async () => {
  try {
    // Référence à la collection 'news' dans Firestore
    const newsCollection = collection(dbstorage, 'programmes');
    
    // Téléchargement de l'image et obtention de l'URL
    const imageUrl = await handleUploadImage();
    
    // Ajout du document dans la collection 'news'
    await addDoc(newsCollection, {
      title,
      name,
      date: new Date().toLocaleString(),
      description,
      imageUrl,
    });

    setModalVisible(false);
    fetchNews()
    Alert.alert('News added!', 'Your programmes has been added successfully.');
  } catch (error) {
    console.error('Error adding news:', error);
    Alert.alert('Error', 'Failed to add programmes.');
  }
};


  const renderNewsItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('DetailProgramme',{
      image:item.imageUrl,
      title:item.title,
      name:item.name,
      date:item.date,
      description:item.description,
    })} >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{item.name}</Text>
          <Text style={styles.metaText}>{item.date}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <FlatList
        data={newsList}
        keyExtractor={item => item.id}
        renderItem={renderNewsItem}
        style={styles.flatList}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Ajouter un programmes</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Ajouter</Text>
          <TextInput
            placeholder="Titre"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Nom"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline
          />
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Choisir image</Text>
          </TouchableOpacity>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
          <TouchableOpacity style={styles.modalButton} onPress={addNews} disabled={uploading}>
            <Text style={styles.modalButtonText}>Valider</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>FERME</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  card: {
   backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 }, 
    flexDirection:'row'
  },
  image: {
    width: '20%',
    height:100,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#888',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  icon: {
    fontSize: 18,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#3cc154',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
  },
  imagePicker: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  imagePickerText: {
    color: '#fff',
    textAlign: 'center',
  },
  previewImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 8,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
