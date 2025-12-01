// src/navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AddCustomerScreen from "../screens/AddCustomerScreen";
import AddServiceScreen from "../screens/AddServiceScreen";
import EditServiceScreen from "../screens/EditServiceScreen";
import LoginScreen from '../screens/LoginScreen';
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import TransactionDetailScreen from "../screens/TransactionDetailScreen";

import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>

      {/* LOGIN GROUP (không header) */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Login" component={LoginScreen} />

        {/* HOME TABS */}
        <Stack.Screen name="HomeTabs" component={BottomTabs} />

        {/* OTHER SCREENS WITH HEADER */}
        <Stack.Screen
          name="AddService"
          component={AddServiceScreen}
          options={{ headerShown: true, title: "Add Service" }}
        />

        <Stack.Screen
          name="ServiceDetail"
          component={ServiceDetailScreen}
          options={{ headerShown: true, title: "Service Detail" }}
        />

        <Stack.Screen
          name="EditService"
          component={EditServiceScreen}
          options={{ headerShown: true, title: "Edit Service" }}
        />

        <Stack.Screen
          name="AddCustomer"
          component={AddCustomerScreen}
          options={{
            headerShown: true, title: "Add Customer", headerStyle: { backgroundColor: "#f25287" },
            headerTintColor: "#fff",
          }}
        />

        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetailScreen}
          options={{
            headerShown: true,
            title: "Transaction Detail",
            headerStyle: { backgroundColor: "#f25287" },
            headerTintColor: "#fff",
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
