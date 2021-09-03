import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { Button, Input, Select, CheckIcon, Checkbox } from "native-base";
import { HOST } from "@env";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountCreationScreenParticulier = (props) => {
  console.log("HOOOOOST", HOST);
  const handleGoCommercant = () => {
    props.navigation.navigate("CreateAccountCommercant");
  };
  const activities = ["restauration", "chaussures"];
  const [centresDinteret, setCentresDinteret] = useState([]);
  const [quartiersFavoris, setQuartiersFavoris] = useState([]);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [sexe, setSexe] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [quartierActivity, setQuartierActivity] = useState("");
  const [show, setShow] = useState(false);
  const handleShowPassword = () => setShow(!show);

  const handleValidateSignup = async () => {
    const envoiInfosBackendRaw = await fetch(`${HOST}/signup-particulier`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        civilite: sexe,
        dateDeNaissance: dateNaissance,
        quartiersFavoris: quartiersFavoris,
        centresDinteret: centresDinteret,
        quartierActivity: quartierActivity,
      }),
    });
    const responseBackendParsed = await envoiInfosBackendRaw.json();
    if (responseBackendParsed.result) {
      AsyncStorage.setItem("token", responseBackendParsed.token);
      props.onSetToken(responseBackendParsed.token);
    }
    console.log("RESPONSE BACKEND PARSED", responseBackendParsed);
  };

  return (
    <ScrollView
      style={{ flex: 1, marginTop: 50 }}
      contentContainerStyle={{ alignItems: "center" }}
    >
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
          style={{ color: "#62ADEB" }}
          mr={0}
          bg="#62ADEB"
          _text={{
            color: "white",
          }}
        >
          Particulier
        </Button>
        <Button
          bg="#62ADEB"
          style={{ color: "#62ADEB" }}
          _text={{
            color: "white",
          }}
          onPress={() => handleGoCommercant()}
        >
          Commerçant
        </Button>
      </Button.Group>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Input
          w="40%"
          mx={3}
          placeholder="Nom"
          onChangeText={(value) => setNom(value)}
        />
        <Input
          w="40%"
          mx={3}
          placeholder="Prénom"
          onChangeText={(value) => setPrenom(value)}
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
          w="55%"
          mx={3}
          placeholder="Date de naissance"
          onChangeText={(value) => setDateNaissance(value)}
        />
        <Select
          selectedValue={activities}
          minWidth={105}
          accessibilityLabel="Sexe"
          placeholder="Sexe"
          value={sexe}
          onValueChange={(itemValue) => setSexe(itemValue)}
          _selectedItem={{
            bg: "cyan.600",
            endIcon: <CheckIcon size={4} />,
          }}
        >
          <Select.Item label="Homme" value="Homme" />
          <Select.Item label="Femme" value="Femme" />
          <Select.Item label="Autre" value="Autre" />
        </Select>
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
            bg="#62ADEB"
          >
            {show ? "Hide" : "Show"}
          </Button>
        }
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <Text style={{ marginTop: 15 }}>Séléctionnez vos centres d'intérêt</Text>
      <Checkbox.Group
        my={2}
        onChange={setCentresDinteret}
        value={centresDinteret}
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
          <Text style={{ marginLeft: 5 }}>Prêt à porter</Text>
        </Checkbox>
        <Checkbox value="three" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Fleuriste</Text>
        </Checkbox>
        <Checkbox value="four" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Provisions</Text>
        </Checkbox>
        <Checkbox value="five" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Concessionnaire de véhicules</Text>
        </Checkbox>
        <Checkbox value="six" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Électroménager</Text>
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
      <Text style={{ marginTop: 15 }}>Séléctionnez vos quartiers favoris</Text>
      <Checkbox.Group
        my={2}
        onChange={setQuartiersFavoris}
        value={quartiersFavoris}
        accessibilityLabel="choose numbers"
        style={{
          maxWidth: "80%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Checkbox value="612c9c4b97af13e59b12845e" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Fontvieille</Text>
        </Checkbox>
        <Checkbox value="612c9c6c97af13e59b12845f" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Condamine</Text>
        </Checkbox>
        <Checkbox value="612c9c7697af13e59b128460" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Le Port</Text>
        </Checkbox>
        <Checkbox value="612c9c8297af13e59b128461" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Larvotto</Text>
        </Checkbox>
        <Checkbox value="612c9c9497af13e59b128462" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Casino</Text>
        </Checkbox>
        <Checkbox value="612c9ca597af13e59b128463" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Jardin Exotique</Text>
        </Checkbox>
        <Checkbox value="612c9cb197af13e59b128464" mx={1} my={1}>
          <Text style={{ marginLeft: 5 }}>Saint-Roman</Text>
        </Checkbox>
      </Checkbox.Group>
      <Select
        minWidth={315}
        accessibilityLabel="Quartier"
        placeholder="D'où venez vous ?"
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
    </ScrollView>
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
)(AccountCreationScreenParticulier);
