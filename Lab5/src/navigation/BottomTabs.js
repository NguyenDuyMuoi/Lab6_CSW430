import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { default as Icon, default as MaterialIcons } from 'react-native-vector-icons/MaterialIcons';


import CustomerScreen from '../screens/CustomerScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import TransactionScreen from '../screens/TransactionScreen';



const Tab = createBottomTabNavigator();
const PINK = '#f25287';

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: PINK,
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Transaction"
      component={TransactionScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="receipt" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Customer"
      component={CustomerScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="people" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
  name="Setting"
  component={SettingScreen}
  options={{
    tabBarLabel: "Setting",
    tabBarIcon: ({ color, size }) => (
      <MaterialIcons name="settings" color={color} size={26} />
    ),
  }}
/>

  </Tab.Navigator>
);

export default BottomTabs;
