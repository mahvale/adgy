import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Picker,Image } from 'react-native';
import { auth, db, dbstorage, ref, query, orderByChild, equalTo, get, set, signInWithEmailAndPassword, createUserWithEmailAndPassword, refdb, storageFile, onValue, push, serverTimestamp, onAuthStateChanged, signOut, uploadBytes, getDownloadURL, app, listAll, limitToLast, doc, setDoc, addDoc, collection, getDocs, onSnapshot, orderBy, where } from '../../firebase';



const SummaryScreen = () => {
  const [data, setData] = useState({ entries: [], exits: [] });
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filteredData, setFilteredData] = useState({ entries: [], exits: [] });

  useEffect(() => {
    const entriesCollection = collection(dbstorage, 'money_entries');
    const exitsCollection = collection(dbstorage, 'money_exit');

    const unsubscribeEntries = onSnapshot(entriesCollection, (snapshot) => {
      const entriesArray = snapshot.docs.map(doc => doc.data());
      setData(prevData => ({ ...prevData, entries: entriesArray }));
    });

    const unsubscribeExits = onSnapshot(exitsCollection, (snapshot) => {
      const exitsArray = snapshot.docs.map(doc => doc.data());
      setData(prevData => ({ ...prevData, exits: exitsArray }));
    });

    return () => {
      unsubscribeEntries();
      unsubscribeExits();
    };
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const filterByMonth = (transactions) => transactions.filter(transaction => {
        const [day, month, year] = transaction.date.split('/');
        return month === selectedMonth;
      });

      setFilteredData({
        entries: filterByMonth(data.entries),
        exits: filterByMonth(data.exits)
      });
    } else {
      setFilteredData(data);
    }
  }, [selectedMonth, data]);

  const calculateBalance = (entries, exits) => {
    const totalEntries = entries.reduce((sum, entry) => parseInt(sum) + parseInt(entry.amount), 0);
    const totalExits = exits.reduce((sum, exit) => parseInt(sum) + parseInt(exit.amount), 0);
    return parseInt(totalEntries) - parseInt(totalExits);
  };

  const balance = calculateBalance(filteredData.entries, filteredData.exits);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const formatCurrency = (amount) => {
    const numberAmount = Number(amount);
    return `${formatNumber(numberAmount.toFixed(2))} FCFA`;
  };

  const renderTable = (entries, exits) => {
    const combinedData = [...entries.map(e => ({ ...e, type: 'entry' })), ...exits.map(e => ({ ...e, type: 'exit' }))].sort((a, b) => new Date(a.date) - new Date(b.date));

    return combinedData.map((item, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={styles.tableCell}>{item.date}</Text>
        <Text style={styles.tableCell}>{item.description}</Text>
        <Text style={[styles.tableCell, item.type === 'entry' ? styles.entry : styles.exit]}>
          {item.type === 'entry' ? formatCurrency(item.amount) : ''}
        </Text>
        <Text style={[styles.tableCell, item.type === 'exit' ? styles.exit : styles.entry]}>
          {item.type === 'exit' ? formatCurrency(item.amount) : ''}
        </Text>
      </View>
    ));
  };

  const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../assets/favicon.png')} // Remplacez par votre propre logo ou icône
        style={styles.logo}
      />
      <Text style={styles.headerText}>Résumé financier</Text>
       <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          <Picker.Item label="Mois" value="" />
          <Picker.Item label="Janvier" value="01" />
          <Picker.Item label="Février" value="02" />
          <Picker.Item label="Mars" value="03" />
          <Picker.Item label="Avril" value="04" />
          <Picker.Item label="Mai" value="05" />
          <Picker.Item label="Juin" value="06" />
          <Picker.Item label="Juillet" value="07" />
          <Picker.Item label="Août" value="08" />
          <Picker.Item label="Septembre" value="09" />
          <Picker.Item label="Octobre" value="10" />
          <Picker.Item label="Novembre" value="11" />
          <Picker.Item label="Décembre" value="12" />
        </Picker>
    </View>
  );
};

  return (
    <ScrollView style={styles.container}>
    <Header />
      <View style={styles.table}>
        <View style={styles.tableRowHeader}>
          <Text style={styles.tableCellHeader}>Date</Text>
          <Text style={styles.tableCellHeader}>Description</Text>
          <Text style={styles.tableCellHeader}>Entrée</Text>
          <Text style={styles.tableCellHeader}>Sortie</Text>
        </View>
        {renderTable(filteredData.entries, filteredData.exits)}
      </View>
      <Text style={styles.balance}>Balance: {formatCurrency(balance)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: 150,
    color: '#3cc154',
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#3cc154',
    borderRadius: 10,
  },
  table: {
    marginBottom: 16,
    padding:16
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#3cc154',
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  tableRowHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#3cc154',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#e3fcec',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  tableCellHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3cc154',
  },
  entry: {
    color: '#2ecc71', // Vert pour les entrées
  },
  exit: {
    color: '#e74c3c', // Rouge pour les sorties
  },
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
   headerContainer: {
    backgroundColor: '#3cc154', // Couleur d'arrière-plan du header
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: -20, // Bord inférieur gauche arrondi
    borderBottomRightRadius: -20, // Bord inférieur droit arrondi
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '100%'
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily:'Roboto'
  },
});

export default SummaryScreen;
