import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity,ImageBackground } from 'react-native';

import {auth, db,dbstorage, ref, query, orderByChild, equalTo, get, set, signInWithEmailAndPassword, createUserWithEmailAndPassword,refdb,storageFile,onValue,push,serverTimestamp,onAuthStateChanged,signOut,uploadBytes,getDownloadURL,app,listAll,limitToLast,doc,setDoc,addDoc,collection,getDocs,onSnapshot,orderBy } from '../firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';

const groupMessagesByDate = (messages) => {
  const groupedMessages = messages.reduce((groups, message) => {
    const timestamp = message.timestamp;
    const date = typeof timestamp === 'string' ? timestamp.split('T')[0] : new Date(timestamp).toISOString().split('T')[0];

    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedMessages).sort((a, b) => new Date(a) - new Date(b)); // Sort in ascending order
  return sortedDates.map(date => ({
    date,
    data: groupedMessages[date],
  }));
};
 
const words = ['other', 'me'];

const formatRelativeTime = (timestamp) => {
  const now = new Date();
  const messageTime = new Date(timestamp);
  const diff = now - messageTime;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `depuis ${days} jour${days > 1 ? 's' : ''}`;
  if (hours > 0) return `depuis ${hours} heure${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `depuis ${minutes} minute${minutes > 1 ? 's' : ''}`;
  return `depuis ${seconds} second${seconds > 1 ? 's' : ''}`;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [word, setWord] = useState('');
  const [nom, setNom] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  useEffect(() => {
  user_fetch(); // Appelez votre fonction user_fetch() ici

  // Référence à la collection 'chats' dans Firestore et requête pour trier par timestamp
  const messagesRef = collection(dbstorage, 'chats');
  const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));

  // Écoute en temps réel des messages
  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    const messagesArray = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    setMessages(messagesArray);
  });

  // Nettoyage à la fin de l'effet pour éviter les fuites de mémoire
  return () => unsubscribe();

}, []);

  const user_fetch = () => {
    AsyncStorage.getItem('user').then((value) => {
      if (value != null) {
        let users = JSON.parse(value);
        setProfileImage(users.profileImageUrl);
        setNom(users.nom);
      }
    });
  };

const handleSendMessage = async () => {
  if (message.trim()) {
    const newMessage = {
      text: message,
      sender: getRandomWord(),
      senderName: nom,
      senderPhoto: profileImage,
      timestamp: new Date().toISOString(),
    };

    try {
      // Référence à la collection 'chats' dans Firestore
      const messagesRef = collection(dbstorage, 'chats');

      // Ajout du nouveau message dans Firestore
      await addDoc(messagesRef, newMessage);

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
};

  const renderItem = ({ item }) => (
    <View style={item.senderName === nom ? styles.myMessageContainer : styles.otherMessageContainer}>
      <Image source={{ uri: item.senderPhoto }} style={styles.senderPhoto} />
      <View>
        <Text style={styles.senderName}>{item.senderName == nom ? 'moi' : item.senderName}</Text>
        {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
        {item.location && <Image source={{ uri: item.location }} style={styles.image} />}
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>{formatRelativeTime(item.timestamp)}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { date } }) => (
    <View style={styles.dateHeader}>
      <Text style={styles.dateHeaderText}>{formatDate(date)}</Text>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/green.png')} style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: profileImage }} style={styles.avatar} />
        <Text style={styles.headerText}>{nom}</Text>
      </View>
      <TextInput
        placeholder="Search in chat"
        style={styles.searchInput}
      /> 
      <FlatList
        data={groupMessagesByDate(messages)}
        renderItem={({ item }) => <FlatList data={item.data} renderItem={renderItem} keyExtractor={message => message.id} />}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.date}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Votre message..."
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#ffffff',
  },
  messageList: {
    flex: 1,
  },
  myMessageContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: '#d1f5d3',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    maxWidth: '70%',
   shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  otherMessageContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#ffebcc',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    maxWidth: '70%',
   shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  senderPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },
  dateHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default ChatScreen;
