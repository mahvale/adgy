import React from 'react';
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const data = [
  { id: '1', uri: 'https://via.placeholder.com/300' },
  { id: '2', uri: 'https://via.placeholder.com/300' },
  { id: '3', uri: 'https://via.placeholder.com/300' },
];

const App = () => {
  return (
    <Swiper
      style={styles.wrapper}
      showsPagination={true}
      autoplay={true}
    >
      {data.map((item) => (
        <View key={item.id} style={styles.slide}>
          <Image source={{ uri: item.uri }} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
});

export default App;

//w44DTD0teo2C
//Website for educational.free.nf
