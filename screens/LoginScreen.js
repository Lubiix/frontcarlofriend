import React from "react";
import { View, Text } from "react-native";
import { Input, Center, NativeBaseProvider, Button } from "native-base";

const LoginScreen = (props) => {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);
  const handleLogin = () => {
    props.navigation.navigate("menu");
  };
  return (
    <View style={{ flex: 1 }}>
      <Text>Login</Text>
      <Input mx={3} placeholder="Email" />
      <Input
        type={show ? "text" : "password"}
        InputRightElement={
          <Button
            ml={1}
            roundedLeft={0}
            roundedRight="md"
            onPress={handleClick}
          >
            {show ? "Hide" : "Show"}
          </Button>
        }
        placeholder="Password"
      />{" "}
      <Button title="Valider" onPress={() => handleLogin()}></Button>
    </View>
  );
};

export default LoginScreen;
