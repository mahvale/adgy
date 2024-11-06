import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
export default function App({ route }) {
  const { image, name, title, description, date } = route.params;
  const navigation = useNavigation();

  // Convertir la date en objet Date
  const dateObject = new Date(date);

  // Calculer la durée depuis la date donnée jusqu'à maintenant
  const duration = getDuration(dateObject);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
        <Card.Content>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{name}</Text>
          <Text style={styles.updateInfo}>
            publier depuis {duration}
          </Text>
          <Text style={styles.timeline}>{date}</Text>
          <Text style={styles.body}>{description}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const getDuration = (pastDate) => {
  const now = new Date();
  const seconds = Math.floor((now - pastDate) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ";
  }
  return Math.floor(seconds) + " seconds";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    paddingLeft: 10,
    paddingRight: 10,
  },
  updateInfo: {
    fontSize: 12,
    color: 'grey',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
  },
  timeline: {
    fontSize: 12,
    color: '#007bff', // blue color for link-like appearance
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
  },
  body: {
    fontSize: 14,
    padding: 10,
    color: 'grey',
    lineHeight: 20,
  },
});
