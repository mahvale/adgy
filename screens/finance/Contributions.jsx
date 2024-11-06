import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db, collection, getDocs, addDoc, query, orderBy, where } from '../../firebase';

const { height, width } = Dimensions.get('window');
const color = "#87CEEB";

const Cotisation = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [total, setTotal] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [products, setProducts] = useState([]);
  const [errorMois, setErrorMois] = useState(false);

  const fetchEntries = useCallback(async () => {
    try {
      const entriesCollection = collection(db, 'Contributions');
      let entriesQuery = query(entriesCollection, orderBy('mois'));

      if (selectedMonth) {
        entriesQuery = query(entriesCollection, orderBy('mois'), where('mois', '==', selectedMonth));
      }

      const querySnapshot = await getDocs(entriesQuery);
      const formattedData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(formattedData);
      setTotal(calculateTotal(formattedData));
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedMonth]);

  const calculateTotal = useCallback((data) => {
    return data.reduce((sum, item) => sum + item.price, 0);
  }, []);

  const handleAddEntry = async () => {
    if (!name || !price || !date) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    let mois = getMonthNameFromDate(date);
    if (!mois) {
      setErrorMois(true);
      return;
    }

    try {
      const entriesCollection = collection(db, 'Contributions');
      const newEntry = {
        name,
        price: parseFloat(price),
        date,
        mois,
      };

      await addDoc(entriesCollection, newEntry);

      setName('');
      setPrice('');
      setDate('');
      setIsModalVisible(false);
      setErrorMois(false);
      fetchEntries();
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite lors de l'ajout de l'entrée");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [selectedMonth, fetchEntries]);

  const filteredData = useMemo(() => {
    return products.filter(item =>
      item.mois.toLowerCase().includes(selectedMonth.toLowerCase())
    );
  }, [products, selectedMonth]);

  const renderProductItem = useCallback(({ item }) => (
    <ProductCard item={item} />
  ), []);

  if (loading) {
    return <ActivityIndicator style={styles.loading} size="large" color={color} />;
  }

  return (
    <View style={styles.container}>
      <Header selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Cotisation Mensuel {formatCurrency(total)}</Text>
          <Ionicons name="add-circle" onPress={() => setIsModalVisible(true)} size={30} color={color} />
        </View>

        <FlatList
          style={styles.productList}
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
        />
      </ScrollView>

      <AddContributionModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        date={date}
        setDate={setDate}
        handleAddEntry={handleAddEntry}
        errorMois={errorMois}
      />
    </View>
  );
};

const Header = ({ selectedMonth, setSelectedMonth }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>TABLEAU DE BORD CONTRIBUTION</Text>
    <Text style={styles.headerText}>MOIS</Text>
    <Picker
      selectedValue={selectedMonth}
      style={styles.picker}
      onValueChange={(itemValue) => setSelectedMonth(itemValue)}
    >
      <Picker.Item label="Mois" value="" />
      {/* Autres options de mois */}
      {['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
        .map(month => (
          <Picker.Item key={month} label={month} value={month} />
        ))}
    </Picker>
  </View>
);

const AddContributionModal = ({
  isVisible,
  setIsVisible,
  name,
  setName,
  price,
  setPrice,
  date,
  setDate,
  handleAddEntry,
  errorMois,
}) => (
  <Modal
    visible={isVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setIsVisible(false)}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={[styles.modalTitle, { color }]}>Ajouter une contribution</Text>
        <TextInput
          style={styles.input}
          placeholder="Libellé..."
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Montant"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, errorMois && styles.errorInput]}
          placeholder="Date (JJ/MM/AAAA)"
          value={date}
          onChangeText={setDate}
        />
        <View style={styles.modalButtons}>
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
    </View>
  </Modal>
);

const ProductCard = React.memo(({ item }) => (
  <View style={styles.productCard}>
    <Image source={{ uri: item.image }} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>
        {formatCurrency(item.price)}{' '}
        <Text style={styles.productPriceText}>{formatDate(item.date)}</Text>
      </Text>
    </View>
  </View>
));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const formatCurrency = (amount) => {
  const numberAmount = Number(amount);
  return `${formatNumber(numberAmount.toFixed(2))} FCFA`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: color,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  picker: {
    width: 150,
    color: '#255621',
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productList: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
  },
  productPriceText: {
    fontWeight: 'normal',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  errorInput: {
    borderBottomColor: 'red',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonClose: {
    backgroundColor: 'red',
    marginLeft: 10,
  },
});

export default Cotisation;
