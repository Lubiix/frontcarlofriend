import React from "react";

import { NativeBaseProvider } from "native-base";

import { StyleSheet } from "react-native";

import { HOST } from "@env";
import { NavigationContainer } from "@react-navigation/native";

import AuthentificatorFlow from "./screens/AuthentificatorFlow";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import token from "./reducers/token";

const store = createStore(combineReducers({ token }));

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
