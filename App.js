import { StatusBar } from "expo-status-bar";
import React from "react";

import { NativeBaseProvider, Box } from "native-base";

<<<<<<< HEAD
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import AccountCreationScreenParticulier from "./screens/AccountCreationScreenParticulier";
import AccountCreationScreenCommercant from "./screens/AccountCreationScreenCommercant";
import LoginScreen from "./screens/LoginScreen";
import MenuNav from "./components/MenuNav";
=======

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import AccountCreationScreenCommercant from './screens/AccountCreationScreenCommercant';
import AccountCreationScreenParticulier from './screens/AccountCreationScreenParticulier'
import LoginScreen from './screens/LoginScreen';
import FeedScreen from "./screens/FeedScreen";
import MenuNav from './components/MenuNav';
import MapScreen from './screens/MapScreen';
>>>>>>> e24a2b6eab01a063f0b2c22bde46dd39759abe7a

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="CreateAccountParticulier"
            component={AccountCreationScreenParticulier}
          />
          <Stack.Screen
            name="CreateAccountCommercant"
            component={AccountCreationScreenCommercant}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
<<<<<<< HEAD
          <Stack.Screen name="menu" component={MenuNav} />
=======
          <Stack.Screen name="menu" component={MenuNav}/>
          <Stack.Screen name="feed" component={FeedScreen}/>
          <Stack.Screen name="map" component={MapScreen}/>
>>>>>>> e24a2b6eab01a063f0b2c22bde46dd39759abe7a
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
