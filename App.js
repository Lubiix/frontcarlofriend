import { StatusBar } from 'expo-status-bar';
import React from 'react';


import { NativeBaseProvider, Box } from 'native-base';


import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import AccountCreationScreen from './screens/AccountCreationScreen';
import LoginScreen from './screens/LoginScreen';
import MenuNav from './components/MenuNav';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="CreateAccount" component={AccountCreationScreen}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="menu" component={MenuNav}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
