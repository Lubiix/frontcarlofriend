import React, { useState, useEffect } from "react";

import HomeScreen from "./HomeScreen";
import AccountCreationScreenCommercant from "./AccountCreationScreenCommercant";
import AccountCreationScreenParticulier from "./AccountCreationScreenParticulier";
import LoginScreen from "./LoginScreen";
import MenuNav from "../components/MenuNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createStackNavigator } from "@react-navigation/stack";

import { connect } from "react-redux";

const Stack = createStackNavigator();

const AuthentificatorFlow = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const handleSetToken = async function () {
      console.log("entré dans la fonction setToken APP");
      // AsyncStorage.removeItem("token");
      AsyncStorage.getItem("token", function (error, data) {
        if (!error) {
          console.log("error dans useEffect APP", error);
          console.log("data dans useEffect APP", data);
          if (data) {
            setIsSignedIn(true);
          }
        }
      });
    };
    handleSetToken();
  }, []);

  console.log("auth flow token", props.token);

  if (props.token && !isSignedIn) {
    setIsSignedIn(true);
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <>
          <Stack.Screen name="menu" component={MenuNav} />
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(AuthentificatorFlow);
