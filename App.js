import React, { useState, useEffect } from "react";

import { NativeBaseProvider } from "native-base";

import { StyleSheet } from "react-native";

import { HOST } from "@env";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import AccountCreationScreenCommercant from "./screens/AccountCreationScreenCommercant";
import AccountCreationScreenParticulier from "./screens/AccountCreationScreenParticulier";
import LoginScreen from "./screens/LoginScreen";
import MenuNav from "./components/MenuNav";
import AuthentificatorFlow from "./screens/AuthentificatorFlow";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import token from "./reducers/token";
import { connect } from "react-redux";

const store = createStore(combineReducers({ token }));

const Stack = createStackNavigator();

export default function App() {
  console.log("Host", HOST);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AuthentificatorFlow />
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
