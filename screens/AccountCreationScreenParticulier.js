import React from "react";
import { View, Text } from "react-native";
import { Button, Input } from "native-base";

const AccountCreationScreenParticulier = (props) => {
  const handleGoCommercant = () => {
    props.navigation.navigate("CreateAccountCommercant");
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text>Créer un compte Particulier</Text>
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
        <Input w="20%" mx={3} placeholder="Age" />
        <Input w="20%" mx={3} placeholder="Civilité" />
      </View>
      <Input w="80%" mx={3} my={2} placeholder="email" />
      <Input w="80%" mx={3} my={2} placeholder="password" />
    </View>
  );
};

export default AccountCreationScreenParticulier;
