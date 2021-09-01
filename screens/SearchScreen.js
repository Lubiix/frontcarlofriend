import React, { Fragment } from "react";
import { View, Text, Input, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";

const SearchScreen = () => {
  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#62ADEB" }} />
      <Input
        my={2}
        placeholder="Recherche utilisateur"
        variant="filled"
        width="100%"
        bg="gray.200"
        borderRadius={10}
        py={1}
        px={2}
        _web={{
          _focus: {
            borderColor: "#62ADEB",
            style: { boxShadow: "none" },
          },
        }}
        InputLeftElement={
          <Icon
            size="sm"
            ml={2}
            size={5}
            color="gray.400"
            as={<Ionicons name="ios-search" />}
          />
        }
      />
    </Fragment>
  );
};

export default SearchScreen;
