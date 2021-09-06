import React, { Fragment, useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import {
  Input,
  Modal,
  Button,
  Box,
  Spinner,
  HStack,
  Text,
  VStack,
} from "native-base";
import { HOST } from "@env";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = (props) => {
  console.log("HOOOOOST", HOST);

  const [show, setShow] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [listErrorsLogin, setListErrorsLogin] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isValidatedByBack, setIsValidatedByBack] = useState(false);

  useEffect(() => {
    const handleSetToken = async function () {
      console.log("entré dans la fonction setToken");
      AsyncStorage.getItem("token", function (error, data) {
        if (!error) {
          console.log("error dans useEffect Particulier", error);
          console.log("data dans useEffect Particulier", data);
          if (data) {
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
          console.log("error dans useEffect Particulier", error);
          console.log("data dans useEffect Particulier", data);
          if (data) {
            props.onSetToken(data);
          }
        }
      });
    };
    handleSetToken();
  }, [isValidatedByBack]);

  console.log(">>loginEmail", loginEmail);
  console.log(">>loginPassword", loginPassword);

  const handleShowPassword = () => setShow(!show);

  const handleLogin = async () => {
    console.log(">>click détécté", HOST);
    setShowModal(true);
    const dataUser = await fetch(`${HOST}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${loginEmail}&password=${loginPassword}`,
    });

    const body = await dataUser.json();
    console.log(">>body", body);
    if (body.result == true) {
      AsyncStorage.setItem("token", body.token);
      setIsValidatedByBack(true);
      setShowModal(false);
    } else {
      setShowModal(false);
      setListErrorsLogin(body.error);
    }
  };

  let tabErrorsLogin = listErrorsLogin.map((error, i) => {
    return (
      <VStack
        mb={3}
        space={2}
        alignItems="center"
        alignSelf="center"
        width="100%"
        key={i}
      >
        <Text fontSize="md">{error}</Text>
      </VStack>
    );
  });

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#62ADEB" }} />
      <SafeAreaView style={{ flex: 1 }}>
        <Box
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
          Connexion
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
        {tabErrorsLogin}

        <Button
          mx={5}
          bg="#62ADEB"
          _text={{ color: "white" }}
          onPress={() => handleLogin()}
        >
          Valider
        </Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.Header alignItems="center">Chargement</Modal.Header>
            <Modal.Body alignItems="center">
              <HStack space={2}>
                <Spinner color="#62ADEB" />
              </HStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </SafeAreaView>
    </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
