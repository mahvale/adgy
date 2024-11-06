import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
 import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Statut from '../screens/Statut'
import Compte from '../screens/Compte'
import Login from '../screens/Login'
import TabScreen from './TabScreen'
import About from '../screens/About'
import Galery from '../screens/Galery'
import DetailsGalery from '../screens/DetailsGalery'
import Suggestion from '../screens/Suggestion'
import Welcome from '../screens/Welcome'
import Profile from '../screens/Profile'
import DetailsInfos from '../screens/DetailsInfos'
import Programme from '../screens/Programme'
import DetailProgramme from '../screens/DetailProgramme'
import Bureaaux from '../screens/Bureaaux'

import Cotisation from '../screens/finance/Cotisation'
import Contributions from '../screens/finance/Contributions'
import Projets from '../screens/finance/Projets'
import Dons from '../screens/finance/Dons'
import Depenses from '../screens/finance/Depenses'
import Entree from '../screens/finance/Entree'
import Bilan from '../screens/finance/Bilan'
import Tontines from '../screens/finance/Tontines'


import ProjectDetails from '../screens/finance/ProjectDetails'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
        <Stack.Navigator
        initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    { 
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0], 
                      }),
                    },
                  ],
                },
              }; 
            }, 
          }}   
        >
            <Stack.Screen  options={{headerShown:false}} name="Statut" component={Statut} />
            <Stack.Screen  options={{headerShown:false}} name="Profile" component={Profile} />
            <Stack.Screen  options={{headerShown:false}} name="About" component={About} />
            <Stack.Screen  options={{headerShown:false}} name="Galery" component={Galery} />
            <Stack.Screen  options={{headerShown:false}} name="Home" component={TabScreen} />
            <Stack.Screen  options={{headerShown:false}} name="Compte" component={Compte} />
            <Stack.Screen  options={{headerShown:false}} name="Login" component={Login} />
            <Stack.Screen  options={{headerShown:false}} name="DetailsGalery" component={DetailsGalery} />
            <Stack.Screen  options={{headerShown:false}} name="Suggestion" component={Suggestion} />
            <Stack.Screen  options={{headerShown:false}} name="Welcome" component={Welcome} />
            <Stack.Screen  options={{headerShown:false}} name="Cotisation" component={Cotisation} />
            <Stack.Screen  options={{headerShown:false}} name="Contributions" component={Contributions} />
            <Stack.Screen  options={{headerShown:false}} name="Dons" component={Dons} />
            <Stack.Screen  options={{headerShown:false}} name="DetailsInfos" component={DetailsInfos} />
            <Stack.Screen  options={{headerShown:false}} name="Projets" component={Projets} />
            <Stack.Screen  options={{headerShown:false}} name="ProjectDetails" component={ProjectDetails} />
            <Stack.Screen  options={{headerShown:false}} name="Depenses" component={Depenses} />
            <Stack.Screen  options={{headerShown:false}} name="Entree" component={Entree} />
            <Stack.Screen  options={{headerShown:false}} name="Programme" component={Programme} />
            <Stack.Screen  options={{headerShown:false}} name="DetailProgramme" component={DetailProgramme} />
            <Stack.Screen  options={{headerShown:false}} name="Bilan" component={Bilan} />
            <Stack.Screen  options={{headerShown:false}} name="Tontines" component={Tontines} />
            <Stack.Screen  options={{headerShown:false}} name="Bureaaux" component={Bureaaux} />
        </Stack.Navigator>
    </SafeAreaProvider>
  );
} 