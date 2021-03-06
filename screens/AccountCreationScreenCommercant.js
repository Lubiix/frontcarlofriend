import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  Button,
  Input,
  Select,
  CheckIcon,
  Checkbox,
  Spinner,
  Modal,
  HStack,
} from "native-base";
import { HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

const AccountCreationScreenCommercant = (props) => {
  const handleGoParticulier = () => {
    props.navigation.navigate("CreateAccountParticulier");
  };
  const [domainesActivity, setDomainesActivity] = useState([]);
  const [quartierActivity, setQuartierActivity] = useState("");
  const [nomEnseigne, setNomEnseigne] = useState("");
  const [numeroRCI, setNumeroRCI] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowPassword = () => setShow(!show);

  const handleValidateSignup = async () => {
    setShowModal(true);
    const envoiInfosBackendRaw = await fetch(`${HOST}/signup-commercant`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomEnseigne: nomEnseigne,
        adresse: adresse,
        email: email,
        password: password,
        numRCI: numeroRCI,
        domainesActivity: domainesActivity,
        quartierActivity: quartierActivity,
      }),
    });
    const responseBackendParsed = await envoiInfosBackendRaw.json();
    if (responseBackendParsed.result) {
      AsyncStorage.setItem("token", responseBackendParsed.token);
      props.onSetToken(responseBackendParsed.token);
      setShowModal(false);
    }
    setShowModal(false);
    console.log("RESPONSE BACKEND PARSED", responseBackendParsed);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
      <Button.Group
        variant="solid"
        isAttached
        space={6}
        mx={{
          base: "auto",
          md: 0,
        }}
      >
        <Button
          bg="#37b4aa"
          style={{ color: "#37b4aa" }}
          mr={0}
          _text={{
            color: "white",
          }}
          onPress={() => handleGoParticulier()}
        >
          Particulier
        </Button>
        <Button
          bg="#37b4aa"
          style={{ color: "#37b4aa" }}
          _text={{
            color: "white",
          }}
        >
          Commer??ant
        </Button>
      </Button.Group>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Input
          w="40%"
          mx={3}
          placeholder="Nom d'enseigne"
          onChangeText={(value) => setNomEnseigne(value)}
        />
        <Input
          w="40%"
          mx={3}
          placeholder="Num??ro RCI"
          onChangeText={(value) => setNumeroRCI(value)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        <Input
          w="85%"
          mx={3}
          placeholder="Adresse"
          onChangeText={(value) => setAdresse(value)}
        />
      </View>
      <Input
        w="85%"
        mx={3}
        my={2}
        placeholder="email"
        onChangeText={(value) => setEmail(value)}
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
            bg="#37b4aa"
          >
            {show ? "Hide" : "Show"}
          </Button>
        }
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        value={password}
      />

      <Text style={{ marginTop: 15 }}>
        S??l??ctionnez vos domaines d'activit??
      </Text>
      <Checkbox.Group
        my={2}
        onChange={setDomainesActivity}
        value={domainesActivity}
        accessibilityLabel="choose numbers"
        style={{
          maxWidth: "80%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Checkbox value="one" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Restauration</Text>
        </Checkbox>
        <Checkbox value="two" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Pr??t ?? porter</Text>
        </Checkbox>
        <Checkbox value="three" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Fleuriste</Text>
        </Checkbox>
        <Checkbox value="four" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Provisions</Text>
        </Checkbox>
        <Checkbox value="five" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Concessionnaire de v??hicules</Text>
        </Checkbox>
        <Checkbox value="six" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>??lectrom??nager</Text>
        </Checkbox>
        <Checkbox value="seven" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Opticien</Text>
        </Checkbox>
        <Checkbox value="seven" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Joaillerie</Text>
        </Checkbox>
        <Checkbox value="seven" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Papeterie</Text>
        </Checkbox>
      </Checkbox.Group>
      <Select
        minWidth={315}
        accessibilityLabel="Quartier"
        placeholder="Quartier d'activit??"
        value={quartierActivity}
        onValueChange={(itemValue) => setQuartierActivity(itemValue)}
        _selectedItem={{
          bg: "cyan.600",
          endIcon: <CheckIcon size={4} />,
        }}
      >
        <Select.Item label="Fontvieille" value="Fontvieille" />
        <Select.Item label="Condamine" value="Condamine" />
        <Select.Item label="Le Port" value="Le Port" />
        <Select.Item label="Larvotto" value="Larvotto" />
        <Select.Item label="Casino" value="Casino" />
        <Select.Item label="Jardin Exotique" value="Jardin Exotique" />
        <Select.Item label="Saint-Roman" value="Saint-Roman" />
      </Select>
      <Button
        bg="#37b4aa"
        style={{ color: "#37b4aa", marginTop: 15 }}
        _text={{
          color: "white",
        }}
        onPress={() => handleValidateSignup()}
      >
        Valider
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Header alignItems="center">Chargement</Modal.Header>
          <Modal.Body alignItems="center">
            <HStack space={2}>
              <Spinner color="#37b4aa" />
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCreationScreenCommercant);
