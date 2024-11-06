import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({navigation}) => {
  const [state, setState] = useState(false)
  const [time, setTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [month, setMonth] = useState('');
  const [weekday, setWeekday] = useState('');

  useEffect(() => {
  setTimeout(()=>{
    setState(true)
  },7000)
  }, [])

  
  
  useEffect(() => {
    const getTime = () => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();

      minutes = minutes < 10 ? `0${minutes}` : minutes;

      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;

      const currentTime = `${hours}:${minutes} ${ampm}`;
      setTime(currentTime);
    };

    getTime();
    const interval = setInterval(getTime, 60000);

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    const getDate = () => {
      const date = new Date();

      const day = date.getDate(); 
      const month = date.toLocaleString('default', { month: 'long' });
      const weekday = date.toLocaleString('default', { weekday: 'long' }); 

      const formattedDate = `${day < 10 ? `0${day}` : day}`;
      setCurrentDate(formattedDate);
      setMonth(month);
      setWeekday(weekday);
    };

    getDate();
  }, []);

if(state){
  return (
    <View style={styles.container2}>
      <LinearGradient
        colors={['#00695C', '#004D40']}
        style={styles.background}
      />

      <Image
        source={require('../assets/favicon.png')} 
        style={styles.wave}
      />

      <View style={styles.topSection}>
        <Text style={styles.clock}>{time}</Text>
      </View>

      <View style={styles.weatherContainer}>
        <Text style={styles.weatherText}>ASSOCIATION DE DEVELOPPEMENT DU GROUPEMENT YEMESSOMO</Text>
        <Text style={styles.temperature}>ADGY</Text>
      </View>

     
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>

       <StatusBar hidden={true} />
    </View>
  );
} else {
   return (
    <View style={styles.container}>
      <Animatable.Image
        animation="zoomIn"
        iterationCount="infinite"
        duration={9000}
        source={require('../assets/favicon.png')} 
        style={styles.image}
      />
       <StatusBar hidden={true} />
    </View>
  );
}



 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  image: {
    width:250,
    height:250,
  },
  container2: {
    flex: 1,
    backgroundColor: '#004D40',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wave: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.5,
  },
  topSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  clock: {
    fontSize: 48,
    color: '#FFF',
    fontWeight: 'bold',
  },
  location: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingLeft: 20,
  },
  dateNumber: {
    fontSize: 60,
    color: '#FFF',
    fontWeight: 'bold',
  },
  month: {
    fontSize: 20,
    color: '#FFF',
    textTransform:'uppercase'
  },
  day: {
    fontSize: 18,
    color: '#FFF',
    textTransform:'uppercase'
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  weatherIcon: {
    width: 60,
    height: 60,
  },
  weatherText: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 10,
    textAlign:'center'
  },
  temperature: {
    fontSize: 30,
    color: '#FFF',
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#FFF',
  },
   button: {
    backgroundColor: '#00796B',
    borderRadius:10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -75 }],
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textTransform:'uppercase'
  },
});

export default SplashScreen;
