import React from "react";
import { View, Text, Button } from "react-native";

const LoginScreen = (props) => {
  const handleLogin = () => {
    props.navigation.navigate("menu");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login</Text>
      <Button title="Valider" onPress={() => handleLogin()}></Button>
    </View>
  );
};

export default LoginScreen;
