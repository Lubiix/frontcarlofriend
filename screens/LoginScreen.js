import React from "react";
import { View } from "react-native";
import {
  Input,
  VStack,
  Text,
  Button,
  Center,
  Box,
  NativeBaseProvider,
} from "native-base";

const LoginScreen = (props) => {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);
  const handleLogin = () => {
    props.navigation.navigate("menu");
  };
  return (
    <View style={{ flex: 1, marginTop: 29 }}>
      <Box
        bg="primary.400"
        p={4}
        _text={{
          fontSize: "md",
          fontWeight: "bold",
          color: "white",
        }}
        alignItems="center"
        mb={3}
      >
        Connection
      </Box>
      <Input mx={5} my={3} placeholder="Email" />
      <Input
        w="90%"
        mx={5}
        mt={3}
        mb={6}
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
      />
      <Button mx={5} onPress={() => handleLogin()}>
        Valider
      </Button>
    </View>
  );
};

export default LoginScreen;
