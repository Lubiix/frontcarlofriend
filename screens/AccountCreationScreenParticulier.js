import React from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";

const AccountCreationScreenParticulier = (props) => {
  const handleGoCommercant = () => {
    props.navigation.navigate("CreateAccountCommercant");
  };
  return (
    <View>
      <Text>Créer un compte Particulier</Text>
      <Button onPress={() => handleGoCommercant()}>go commerçant</Button>
    </View>
  );
};

export default AccountCreationScreenParticulier;