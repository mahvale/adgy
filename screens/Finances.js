import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  StatusBar,
  Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window');

const Finances = ({ navigation }) => {
  const data = [
    { id: 1, title: 'COTISATION', color: '#f9b24a', members: 8, image: require('../assets/cotisation.png'), pages: 'Cotisation' },
    { id: 2, title: 'Contributions', color: '#87CEEB', members: 6, image: require('../assets/Contributions.png'), pages: 'Contributions' },
    { id: 3, title: 'Dons et Legs', color: '#4682B4', members: 12, image:require('../assets/Dons.png'), pages: 'Dons' },
    { id: 4, title: 'Des Amendes', color: '#6A5ACD', members: 5, image: require('../assets/Projets.png'), pages: 'Projets' },
    { id: 5, title: 'Tontines', color: '#FF69B4', members: 6, image: require('../assets/Tontines.png'), pages: 'Tontines' },
    { id: 6, title: 'Sorties', color: '#00BFFF', members: 7, image: require('../assets/Depenses.png'), pages: 'Depenses' },
    { id: 7, title: 'Entree', color: '#00FFFF', members: 8, image:require('../assets/Entree.png'), pages: 'Entree' },
    { id: 8, title: 'Bilan', color: '#20B2AA', members: 23, image: require('../assets/Bilan.png'), pages: 'Bilan' },
  ];

  const [options, setOptions] = useState(data);

  const showAlert = () => {
    Alert.alert('Option selected');
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={options}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.pages, { color: item.color })}
          >
            <Animatable.View animation="fadeIn" style={styles.cardHeader}>
              <Text style={styles.title}>{item.title}</Text>
              <Image
                style={styles.settingsIcon}
                source={{ uri: 'https://img.icons8.com/ios/40/000000/settings.png' }}
              />
            </Animatable.View>
            <Animatable.Image animation="fadeIn" style={styles.cardImage} source={item.image} />
            <Animatable.View animation="fadeIn" style={styles.cardFooter} />
          </TouchableOpacity>
        )}
      />
      <StatusBar hidden={true} />
    </View>
  );
};

export default Finances;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
  card: {
    width: width * 0.45,  // Fixed width for each card (adjust as needed)
    height: 150,          // Fixed height for each card (adjust as needed)
    margin: 5,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    justifyContent: 'center', // Center content vertically
  },
  cardHeader: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 35,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  settingsIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});
