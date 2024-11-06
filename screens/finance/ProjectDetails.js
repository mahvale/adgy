// screens/ProjectDetailsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ProjectDetailsScreen({ route, navigation }) {
  const { project } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.description}>{project.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={20} color="#000" />
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 18,
  },
});

export default ProjectDetailsScreen;
