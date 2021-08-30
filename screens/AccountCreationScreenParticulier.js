import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Input, Select, CheckIcon, Checkbox } from "native-base";

const AccountCreationScreenParticulier = (props) => {
  const handleGoCommercant = () => {
    props.navigation.navigate("CreateAccountCommercant");
  };
  const activities = ["restauration", "chaussures"];
  const [centresDinteret, setCentresDinteret] = useState([]);
  const [quartiersFavoris, setQuartiersFavoris] = useState([]);
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Button.Group
        variant="solid"
        isAttached
        space={6}
        mx={{
          base: "auto",
          md: 0,
        }}
      >
        <Button style={{ color: "#62ADEB" }} mr={0}>
          Particulier
        </Button>
        <Button
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
        <Input w="40%" mx={3} placeholder="Nom" />
        <Input w="40%" mx={3} placeholder="Prénom" />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        <Input w="55%" mx={3} placeholder="Date de naissance" />
        <Select
          selectedValue={activities}
          minWidth={105}
          accessibilityLabel="Sexe"
          placeholder="Sexe"
          // onValueChange={(itemValue) => setLanguage(itemValue)}
          _selectedItem={{
            bg: "cyan.600",
            endIcon: <CheckIcon size={4} />,
          }}
        >
          <Select.Item label="Homme" value="male" />
          <Select.Item label="Femme" value="ts" />
          <Select.Item label="Autre" value="ts" />
        </Select>
      </View>
      <Input w="85%" mx={3} my={2} placeholder="email" />
      <Input w="85%" mx={3} my={2} placeholder="mot de passe" />
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
      <Button
        style={{ color: "#62ADEB", marginTop: 15 }}
        _text={{
          color: "white",
        }}
      >
        Valider
      </Button>
    </View>
  );
};

export default AccountCreationScreenParticulier;
