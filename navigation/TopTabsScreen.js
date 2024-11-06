import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import HomeScreen from '../screens/TopTabs/HomeScreen'
import BureauScreen from '../screens/TopTabs/BureauScreen'

const TopTabsScreen = () => {

	const Tab = createMaterialTopTabNavigator();

	return (
		<Tab.Navigator 
				screenOptions={{
					tabBarLabelStyle: { fontSize:15,fontFamily: 'Roboto' },
					tabBarStyle: { backgroundColor: '#fff',},
					tabBarInactiveTintColor:'#ccc',
					tabBarActiveTintColor:'#50bc91',
					tabBarIndicatorStyle: {
			            backgroundColor: '#50bc91', // Active tab indicator color
			            height: 3,
			          },
				}}>
			<Tab.Screen  options={{headerShown:true,title:"Membres"}} name="HomeScreen" component={HomeScreen} />
			<Tab.Screen  options={{headerShown:false,title:"Bureaux"}} name="BureauScreen" component={BureauScreen} />
		</Tab.Navigator>
	)
}

export default TopTabsScreen