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

export default HomeScreen;
