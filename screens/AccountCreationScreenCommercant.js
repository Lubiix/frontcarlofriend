import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Input, Select, CheckIcon, Checkbox } from "native-base";

const AccountCreationScreenCommercant = (props) => {
  const handleGoParticulier = () => {
    props.navigation.navigate("CreateAccountParticulier");
  };
  const activities = ["restauration", "chaussures"];
  const [centresDinteret, setCentresDinteret] = useState([]);
  const [quartierActivity, setQuartierActivity] = useState("");
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
        <Button
          style={{ color: "#62ADEB" }}
          mr={0}
          onPress={() => handleGoParticulier()}
        >
          Particulier
        </Button>
        <Button
          style={{ color: "#62ADEB" }}
          _text={{
            color: "white",
          }}
        >
          Commerçant
        </Button>
      </Button.Group>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Input w="40%" mx={3} placeholder="Nom d'enseigne" />
        <Input w="40%" mx={3} placeholder="Numéro RCI" />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        <Input w="85%" mx={3} placeholder="Adresse" />
      </View>
      <Input w="85%" mx={3} my={2} placeholder="email" />
      <Input w="85%" mx={3} my={2} placeholder="mot de passe" />

      <Text style={{ marginTop: 15 }}>
        Séléctionnez vos domaines d'activité
      </Text>
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
      <Select
        selectedValue={activities}
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
export default AccountCreationScreenCommercant;
