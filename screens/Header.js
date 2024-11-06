import { View, Text, Image, Switch,TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";
import Animated, { FadeInDown } from "react-native-reanimated";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Header() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <Animated.View
      style={{
        flexDirection: 'row', // flex-row
        justifyContent: 'space-between', // justify-between
        alignItems: 'center', // items-center
      }}
      entering={FadeInDown.duration(500).springify().delay(100)}
    >
      <View style={{
          borderWidth: 2, // border-2
          borderColor: '#ffffff', // border-white
          borderRadius: 999, // rounded-full (use a large number for full rounding)
          overflow: 'hidden', // overflow-hidden
      }} >
        <TouchableOpacity 
            style={{
              width:40,
              height:40,
              borderRadius:10,
              justifyContent:'center',
              alignItems:'center',
              backgroundColor: '#fff' 
            }} >
              <FontAwesome5 name="chevron-left" size={24} color='#205e23' />
            </TouchableOpacity>
      </View>

      {/* Notifications and Switch Icon */}
      <View style={{
        flexDirection: 'row', // flex-row
        justifyContent: 'center', // justify-center
        alignItems: 'center', // items-center
        marginHorizontal: 16,
      }} >
        <FontAwesome
          size={30}
          color={colorScheme == "dark" ? "white" : "black"}
        />
      </View>
    </Animated.View>
  );
}
