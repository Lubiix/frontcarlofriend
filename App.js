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
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import token from "./reducers/token";

const store = createStore(combineReducers({ token }));

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
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
