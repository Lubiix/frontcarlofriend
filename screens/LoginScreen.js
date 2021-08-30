import React, { Fragment, useState } from "react";
import { View, SafeAreaView } from "react-native";
import { Input, Button, Box } from "native-base";
import { HOST } from "@env";

const LoginScreen = (props) => {
  const [show, setShow] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  console.log(">>loginEmail", loginEmail);
  console.log(">>loginPassword", loginPassword);

  const handleShowPassword = () => setShow(!show);

  const handleLogin = async () => {
    console.log(">>click détécté");
    const dataUser = await fetch("http://HOST:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${loginEmail}&password=${loginPassword}`,
    });

    const body = await dataUser.json();
    console.log(">>body", body);
    if (body.result == true) {
      props.navigation.navigate("menu");
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#62ADEB" }} />
      <SafeAreaView style={{ flex: 1 }}>
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
          bg="#62ADEB"
        >
          Connection
        </Box>
        <Input
          mx={5}
          my={3}
          placeholder="Email"
          onChangeText={(value) => setLoginEmail(value)}
          value={loginEmail}
        />
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
              onPress={handleShowPassword}
              _text={{ color: "white" }}
              bg="#62ADEB"
            >
              {show ? "Hide" : "Show"}
            </Button>
          }
          placeholder="Password"
          onChangeText={(value) => setLoginPassword(value)}
          value={loginPassword}
        />
        <Button
          mx={5}
          bg="#62ADEB"
          _text={{ color: "white" }}
          onPress={() => handleLogin()}
        >
          Valider
        </Button>
      </SafeAreaView>
    </Fragment>
  );
};

export default LoginScreen;
