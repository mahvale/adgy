import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, FlatList, ScrollView, ActivityIndicator, Modal, TextInput, Alert } from 'react-native';
import { auth, db,dbstorage, ref, query, orderByChild, equalTo, get, set, signInWithEmailAndPassword, createUserWithEmailAndPassword,refdb,storageFile,onValue,push,serverTimestamp,onAuthStateChanged,signOut,uploadBytes,getDownloadURL,app,listAll,limitToLast,doc,setDoc,addDoc,collection,getDocs,onSnapshot,orderBy,where} from '../../firebase';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
const { height, width } = Dimensions.get('window');



const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};

const Cotisation = ({ route, navigation }) => {
  const color = "#f9b24a";

  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [total, setTotal] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserImage, setSelectedUserImage] = useState('');
  const [errorMois, setErrorMois] = useState(false);

  const filteredData = products.filter(item =>
    item.mois.toLowerCase().includes(selectedMonth.toLowerCase())
  );

  const getMonthNameFromDate = (dateString) => {
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const dateParts = dateString.split('/');
    const monthIndex = parseInt(dateParts[1], 10) - 1;
    return monthNames[monthIndex];
  };

   const getDayNameFromDate = (dateString) => {
    const dayNames = [
      'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
    ];
    const dateParts = dateString.split('/');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);
    const date = new Date(year, month, day);
    const dayIndex = date.getDay();
    return dayNames[dayIndex];
  }

  const dateJours = (dateString) => {
    const dateParts = dateString.split('/');
    return parseInt(dateParts[0], 10);
  }

  const dateYears = (dateString) => {
    const dateParts = dateString.split('/');
    return parseInt(dateParts[2], 10);
  }

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const formatCurrency = (amount) => {
  const numberAmount = Number(amount);
  return `${formatNumber(numberAmount.toFixed(2))} FCFA`;
};

useEffect(() => {
  const fetchUsers = async () => {
    try {
      // Référence à la collection 'users' dans Firestore
      const usersCollection = collection(dbstorage, 'users');
      
      // Récupération des documents de la collection
      const usersSnapshot = await getDocs(usersCollection);
      
      // Formatage des données pour les stocker dans un tableau
      const formattedData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Mise à jour de l'état avec les données formatées
      setUsers(formattedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  fetchUsers();
}, []);


useEffect(() => {
  fetchEntries();
}, [selectedMonth]);

const fetchEntries = async () => {
    try {
      // Référence à la collection 'cotisations' dans Firestore
      const entriesCollection = collection(dbstorage, 'cotisations');
      
      // Créez une requête pour filtrer les données en fonction du mois sélectionné
      let entriesQuery = query(entriesCollection, orderBy('mois'));
      
      if (selectedMonth) {
        entriesQuery = query(entriesCollection, orderBy('mois'), where('mois', '==', selectedMonth));
      }

      // Récupération des documents correspondant à la requête
      const entriesSnapshot = await getDocs(entriesQuery);
      
      // Formatage des données pour les stocker dans un tableau
      const formattedData = entriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Mise à jour de l'état avec les données formatées
      setProducts(formattedData);
      setTotal(calculateTotal(formattedData));
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des entrées:', error);
    }
  };

  const ProductCard = ({ item }) => {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          {formatCurrency(item.price)}
          <Text style={styles.productPriceText}> {dateJours(item.date)} {getMonthNameFromDate(item.date)} {dateYears(item.date)}</Text>
        </Text>
      </View>
    </View>
  );
};

  const calculateTotal = (data) => {
    return data.reduce((sum, item) => sum + item.price, 0);
  };

const handleAddEntry = async () => {
  if (name && price && date) {
    try {
      let mois = getMonthNameFromDate(date);
      if (mois) {
        const selectedUser = users.find(user => user.nom === name);
        const image = selectedUser ? selectedUser.profileImageUrl : 'https://img.icons8.com/?size=80&id=BdeiHTKLHn3T&format=png';
        
        // Référence à la collection 'cotisations' dans Firestore
        const entriesCollection = collection(dbstorage, 'cotisations');
        
        // Nouveau document à ajouter
        const newEntry = {
          name,
          price: parseFloat(price),
          date,
          mois,
          image
        };
        
        // Ajoute le nouveau document à la collection
        await addDoc(entriesCollection, newEntry);
        
        // Réinitialise les champs et masque le modal
        setName('');
        setPrice('');
        setDate('');
        setIsVisible(false);
        fetchEntries();
      } else {
        setErrorMois(true);
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite lors de l'ajout de l'entrée");
    }
  } else {
    Alert.alert("Erreur", "Veuillez remplir tous les champs");
  }
};


  const renderProductItem = ({ item }) => (
    <ProductCard item={item} />
  );

  if (loading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size="large" color={color} />;
  }

  return (
    <View>
      <View style={{
        backgroundColor: color,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }} >
        <Text style={{ color: '#fff', marginVertical: 10, fontWeight: 'bold', textAlign: 'center' }}>TABLEAU DE BORD COTISATION</Text>
        <Text style={{ color: '#fff', marginVertical: 10, fontWeight: 'bold', textAlign: 'center' }}>MOIS</Text>
        <View>
           <Picker
          selectedValue={selectedMonth}
          style={{ height: 50, width: 150, color, marginVertical: 10, borderColor: 'white', borderWidth: 2, borderRadius: 10 }}
          onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
        >
          <Picker.Item label="Tous" value="" />
          <Picker.Item label="Janvier" value="Janvier" />
          <Picker.Item label="Février" value="Février" />
          <Picker.Item label="Mars" value="Mars" />
          <Picker.Item label="Avril" value="Avril" />
          <Picker.Item label="Mai" value="Mai" />
          <Picker.Item label="Juin" value="Juin" />
          <Picker.Item label="Juillet" value="Juillet" />
          <Picker.Item label="Août" value="Août" />
          <Picker.Item label="Septembre" value="Septembre" />
          <Picker.Item label="Octobre" value="Octobre" />
          <Picker.Item label="Novembre" value="Novembre" />
          <Picker.Item label="Décembre" value="Décembre" />
        </Picker>
        </View>
       
      </View>

      <ScrollView style={{ height: '90%', backgroundColor: '#f7f7f7' }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ width: '100%', padding: 10 }}>
        <View style={{flexDirection:'row',justifyContent:'space-between' }} >
          <Text style={{ color: color, fontWeight: 'bold', fontSize:25 }}>Cotisation Mensuel {formatCurrency(total)}</Text>
           <Ionicons name="add-circle" onPress={() => setIsVisible(true)} size={30} color={color} />
        </View>
          
          <FlatList
            style={styles.productList}
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderProductItem}
          />
        </View>
      </ScrollView>
     
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { color }]}>Ajouter une cotisation</Text>
            <Picker
              selectedValue={name}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) => {
                setName(itemValue);
                const selectedUser = users.find(user => user.nom === itemValue);
                setSelectedUserImage(selectedUser ? selectedUser.profileImageUrl : '');
              }}
            >
              <Picker.Item label="Sélectionner un utilisateur" value="" />
              {users.map(user => (
                <Picker.Item key={user.id} label={user.nom} value={user.nom} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Montant"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input,{borderColor:errorMois ? 'red':null,borderWidth:1}]}
              placeholder="Date (JJ/MM/AAAA)"
              value={date}
              onChangeText={setDate}
            />
            {selectedUserImage ? <Image source={{ uri: selectedUserImage }} style={styles.userImage} /> : null}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: color }]}
              onPress={handleAddEntry}
            >
              <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsVisible(false)}
            >
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Cotisation;

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.50,
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 40,
  },
  productList: {
    flex: 1,
    paddingTop: 16,
  },
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    marginRight: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  productPriceText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 12,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#06099c',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  buttonClose: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
