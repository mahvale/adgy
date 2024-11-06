import React from 'react'
import { View, Text,ImageBackground } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import SnackScreen from './navigation/SnackScreen'


const App = () => {
  return (
    <NavigationContainer>
        <SnackScreen />
    </NavigationContainer>
  )
}

export default App