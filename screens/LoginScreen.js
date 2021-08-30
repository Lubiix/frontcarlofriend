import React from "react";
import { View, Text, Button } from "react-native";

const LoginScreen = (props) => {
  const handleLogin = () => {
    props.navigation.navigate("feed");
  };
  return (
    <View style={{ flex: 1 }}>
      <Text>Login</Text>
      <Button title="Valider" onPress={() => handleLogin()}></Button>
    </View>
  );
};

export default LoginScreen;
