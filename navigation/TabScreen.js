import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View,Dimensions,StyleSheet,Image  } from 'react-native';
import Animated from 'react-native-reanimated';

import HomeScreen from '../screens/Home'
import Finances from '../screens/Finances'
import Evenement from '../screens/Evenement'

import TopTabsScreen from './TopTabsScreen'


import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const App = () => (
    <Tab.Navigator       
      tabBarOptions={{
          showLabel:false,
      }}
      screenOptions={{
        
        }}
     >

      <Tab.Screen options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return (
                <View style={{alignItems:'center',justifyContent:'center',top:1}} >
                 <Ionicons name="home" size={20} color={focused ? 'green' : 'gray'}  />
                  <Text style={{
                        color: focused ? 'green' : 'gray',
                        fontSize:12,
                        fontFamily: 'Felix Titling',
                        marginTop:3
                      }} >
                        Accueil
                  </Text>
                </View>
              );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown:false
        })} name="Home" component={HomeScreen} />

      <Tab.Screen options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Membres') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return (
                <View style={{alignItems:'center',justifyContent:'center',top:1}} >
                  <FontAwesome size={20}  color={focused ? 'green' : 'gray'} name="users" />
                  <Text style={{
                        color: focused ? 'green' : 'gray',
                        fontSize:12,
                        fontFamily: 'Felix Titling',
                        marginTop:3
                      }} >
                        Membres
                  </Text>
                </View>
              );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown:false
        })} name="Membres" component={TopTabsScreen} />

     <Tab.Screen options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Finances') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return (
                <View style={{alignItems:'center',justifyContent:'center',top:1}} >
                  <Fontisto name="money-symbol" size={20} color={focused ? 'green' : 'gray'} />
                  <Text style={{
                        color: focused ? 'green' : 'gray',
                        fontSize:12,
                        fontFamily: 'Felix Titling',
                        marginTop:3,
                        marginLeft:5
                      }} >
                        finances
                  </Text>
                </View>
              );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown:false
        })} name="Finances" component={Finances} />
        <Tab.Screen options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Evenement') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return (
                <View style={{alignItems:'center',justifyContent:'center',top:1,marginLeft:5}} >
                  <Fontisto name="calendar" size={20} color={focused ? 'green' : 'gray'} />
                  <Text style={{
                        color: focused ? 'green' : 'gray',
                        fontSize:12,
                        fontFamily: 'Felix Titling',
                        marginTop:3
                      }} >
                       INFOS
                  </Text>
                </View>
              );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown:false
        })} name="Evenement" component={Evenement} />
    </Tab.Navigator>
);

export default App;

const styles = StyleSheet.create({
  shadow:{
    shadowColor: 'green',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation:3
  }
})


