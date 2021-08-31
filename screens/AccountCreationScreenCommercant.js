import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Input, Select, CheckIcon, Checkbox } from "native-base";
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
  const [isValidatedByBack, setIsValidatedByBack] = useState(false);

  useEffect(() => {
    const handleSetToken = async function () {
      console.log("entré dans la fonction setToken");
      AsyncStorage.getItem("token", function (error, data) {
        if (!error) {
          console.log("error dans useEffect Commercant", error);
          console.log("data dans useEffect Commercant", data);
          if (data) {
            setIsValidatedByBack(true);
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
          console.log("error dans useEffect Commercant", error);
          console.log("data dans useEffect Commercant", data);
          if (data) {
            setIsValidatedByBack(true);
            props.onSetToken(data);
          }
        }
      });
    };
    handleSetToken();
  }, [isValidatedByBack]);

  if (props.token) {
    props.navigation.navigate("menu");
  }

  const handleValidateSignup = async () => {
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
      setIsValidatedByBack(true);
    }
    console.log("RESPONSE BACKEND PARSED", responseBackendParsed);
  };

  if (isValidatedByBack) {
    props.navigation.navigate("menu");
  }

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
          bg="#62ADEB"
          style={{ color: "#62ADEB" }}
          mr={0}
          _text={{
            color: "white",
          }}
          onPress={() => handleGoParticulier()}
        >
          Particulier
        </Button>
        <Button
          bg="#62ADEB"
          style={{ color: "#62ADEB" }}
          _text={{
            color: "white",
          }}
        >
          Commerçant
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
          placeholder="Numéro RCI"
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
        w="85%"
        mx={3}
        my={2}
        placeholder="mot de passe"
        onChangeText={(value) => setPassword(value)}
      />

      <Text style={{ marginTop: 15 }}>
        Séléctionnez vos domaines d'activité
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
          <Text style={{ marginLeft: 5 }}>One</Text>
        </Checkbox>
        <Checkbox value="two" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Two</Text>
        </Checkbox>
        <Checkbox value="three" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Three</Text>
        </Checkbox>
        <Checkbox value="four" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Four</Text>
        </Checkbox>
        <Checkbox value="five" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Five</Text>
        </Checkbox>
        <Checkbox value="six" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Six</Text>
        </Checkbox>
        <Checkbox value="seven" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Seven</Text>
        </Checkbox>
      </Checkbox.Group>
      <Select
        minWidth={315}
        accessibilityLabel="Quartier"
        placeholder="Quartier d'activité"
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
        bg="#62ADEB"
        style={{ color: "#62ADEB", marginTop: 15 }}
        _text={{
          color: "white",
        }}
        onPress={() => handleValidateSignup()}
      >
        Valider
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCreationScreenCommercant);
