import React from "react";

import { NativeBaseProvider, Box } from "native-base";

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import AccountCreationScreenCommercant from "./screens/AccountCreationScreenCommercant";
import AccountCreationScreenParticulier from "./screens/AccountCreationScreenParticulier";
import LoginScreen from "./screens/LoginScreen";
import FeedScreen from "./screens/FeedScreen";
import MenuNav from "./components/MenuNav";
import MapScreen from "./screens/MapScreen";
import MainNav from "./components/MainNav";
import AddEvent from "./screens/AddEvent";
import AddPostScreen from "./screens/AddPostScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
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
          <Stack.Screen name="menu" component={MenuNav} />
          <Stack.Screen name="feed" component={FeedScreen} />
          <Stack.Screen name="map" component={MapScreen} />
          <Stack.Screen name="main" component={MainNav} />
          <Stack.Screen name="event" component={AddEvent}/>
          <Stack.Screen name="post" component={AddPostScreen}/>
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
