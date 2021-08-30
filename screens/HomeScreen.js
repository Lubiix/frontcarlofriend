import React from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";

const HomeScreen = (props) => {
  const handleCreerUnCompte = () => {
    props.navigation.navigate("CreateAccountParticulier");
  };

  const handleSeConnecter = () => {
    props.navigation.navigate("Login");
  };
  return (
    <View style={{ flex:1, alignItems: "center",
    justifyContent: "center"}}>
      <Text>Home</Text>
      <Button onPress={() => handleCreerUnCompte()}>Créer un compte</Button>
      <Button onPress={() => handleSeConnecter()}>Se Connecter</Button>
    </View>
  );
};

export default HomeScreen;
