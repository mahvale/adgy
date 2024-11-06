import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ActivityIndicator, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { auth, db,dbstorage, ref, query, orderByChild, equalTo, get, set, signInWithEmailAndPassword, createUserWithEmailAndPassword,refdb,storageFile,onValue,push,serverTimestamp,onAuthStateChanged,signOut,uploadBytes,getDownloadURL,app,listAll,limitToLast,doc,setDoc,addDoc,collection,getDocs,onSnapshot,orderBy,where } from '../../firebase';

import { Picker } from '@react-native-picker/picker';
const color = "#00bfff";
const Header = ({navigation}) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
 
  const getMonthNameFromDate = (dateString) => {
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const dateParts = dateString.split('/');
    const monthIndex = parseInt(dateParts[1], 10) - 1;
    return monthNames[monthIndex];
  }

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

  const TaskItem = ({ task }) => (
    <View style={styles.taskItem}>
      <Image
        style={styles.icon}
        source={{ uri: 'https://img.icons8.com/material-rounded/24/000000/checkmark.png' }}
      />
      <View style={styles.taskDetails}>
        <Text style={styles.taskTitle}>{task.description}</Text>
        <View style={styles.taskMeta}>
          <Ionicons name="cash-outline" style={{ marginRight: 5 }} size={24} color="black" />
          <Text style={styles.taskDate}>{formatCurrency(task.amount)}</Text>
        </View>
      </View>
      <Text style={styles.taskTimestamp}> {dateJours(task.date)} {getMonthNameFromDate(task.date)} {dateYears(task.date)}</Text>
    </View>
  );

useEffect(() => {
  fetchEntries();
}, [selectedMonth]);

 const fetchEntries = async () => {
    try {
      // Référence à la collection 'money_exit'
      const entriesRef = collection(dbstorage, 'money_exit');

      // Création de la requête en fonction du mois sélectionné
      let filteredEntriesQuery;
      if (selectedMonth) {
        filteredEntriesQuery = query(entriesRef, where('mois', '==', selectedMonth), orderBy('mois'));
      } else {
        filteredEntriesQuery = query(entriesRef, orderBy('mois'));
      }

      // Récupération des documents de la requête
      const querySnapshot = await getDocs(filteredEntriesQuery);

      // Formatage des données
      const formattedData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

const handleAddEntry = async () => {
  if (description && amount && date) {
    try {
      let mois = getMonthNameFromDate(date);
      const entriesRef = collection(dbstorage, 'money_exit');
      const newEntry = {
        description,
        amount: parseFloat(amount),
        date,
        mois
      };

      // Ajouter le nouveau document à la collection
      await addDoc(entriesRef, newEntry);

      setDescription('');
      setAmount('');
      setDate('');
      setIsVisible(false);
      fetchEntries();
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite lors de l'ajout de l'entrée");
    }
  } else {
    Alert.alert("Erreur", "Veuillez remplir tous les champs");
  }
};


  const handleMonthChange = (itemValue) => {
    setSelectedMonth(itemValue);
  };

  const totalAmount = tasks.reduce((total, task) => total + parseFloat(task.amount), 0).toFixed(2);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size="large" color={color} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.siteTitle}>ADGY</Text>
        </View>
        <View style={styles.searchContainer}>
         <Text style={{ color: '#fff', marginVertical: 10, fontWeight: 'bold', textAlign: 'center' }}>MOIS</Text>
          <Picker
            selectedValue={selectedMonth}
            style={styles.picker}
            onValueChange={handleMonthChange}
          >
            <Picker.Item label="Tous" value="" />
            <Picker.Item label="Janvier" value="Janvier" />
            <Picker.Item label="Février" value="Février" />
            <Picker.Item label="Mars"    value="Mars" />
            <Picker.Item label="Avril"   value="Avril" />
            <Picker.Item label="Mai"     value="Mai" />
            <Picker.Item label="Juin"    value="Juin" />
            <Picker.Item label="Juillet" value="Juillet" />
            <Picker.Item label="Août"    value="Août" />
            <Picker.Item label="Septembre" value="Septembre" />
            <Picker.Item label="Octobre" value="Octobre" />
            <Picker.Item label="Novembre" value="Novembre" />
            <Picker.Item label="Décembre" value="Décembre" />
          </Picker>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.doneActivities}>Listes des Sorties ({tasks.length})</Text>
        <Text style={styles.totalAmount}>Total : {totalAmount} FCFA</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsVisible(true)}
        >
          <Ionicons name="add-circle" size={60} color={color} />
        </TouchableOpacity>
        <FlatList
          data={tasks}
          renderItem={({ item }) => <TaskItem task={item} />}
          keyExtractor={item => item.id}
        />
        <Modal
          visible={isVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Ajouter une Sortie</Text>
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
              <TextInput
                style={styles.input}
                placeholder="Montant"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Date (JJ/MM/AAAA)"
                value={date}
                onChangeText={setDate}
              />
              <TouchableOpacity
                style={styles.button}
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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor:color,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  siteTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: 'Roboto',
    textTransform:'uppercase'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: 150,
    color,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  doneActivities: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Roboto',
    textTransform:'uppercase'
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color,
    textAlign: 'right',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor:color,
  },
  taskDetails: {
    flex: 1,
    marginLeft: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  taskDate: {
    marginRight: 10,
    fontSize: 16,
    color: 'gray',
  },
  taskTimestamp: {
    marginLeft: 10,
    fontSize: 16,
    color,
    textTransform:'uppercase',
    fontFamily:'Roboto'
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999,
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
    color: '#3cc154',
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
    backgroundColor:color,
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
});

export default Header;
