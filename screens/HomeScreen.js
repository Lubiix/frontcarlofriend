import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

const HomeScreen = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const handleSetToken = async function () {
      console.log("entré dans la fonction setToken");
      AsyncStorage.getItem("token", function (error, data) {
        if (!error) {
          console.log("error dans useEffect Home", error);
          console.log("data dans useEffect Home", data);
          if (data) {
            setIsConnected(true);
            props.onSetToken(data);
          }
        }
      });
    };
    handleSetToken();
  }, []);

  useEffect(() => {
    const handleSetToken = async function () {
      console.log("entré dans la fonction setToken");
      AsyncStorage.getItem("token", function (error, data) {
        if (!error) {
          console.log("error dans useEffect Home", error);
          console.log("data dans useEffect Home", data);
          if (data) {
            setIsConnected(true);
            props.onSetToken(data);
            props.navigation.navigate("menu");
          }
        }
      });
    };
    handleSetToken();
  }, [isConnected]);

  // if (isConnected) {
  //   props.navigation.navigate("menu");
  // }

  // if (props.token) {
  //   props.navigation.navigate("menu");
  // }

  const handleCreerUnCompte = () => {
    props.navigation.navigate("CreateAccountParticulier");
  };

  const handleSeConnecter = () => {
    props.navigation.navigate("Login");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button w="80%" my={1} onPress={() => handleCreerUnCompte()}>
        Créer un compte
      </Button>
      <Button w="80%" my={4} onPress={() => handleSeConnecter()}>
        Se Connecter
      </Button>
    </View>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    onSetToken: function (token) {
      dispatch({ type: "setToken", token: token });
    },
  };
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
