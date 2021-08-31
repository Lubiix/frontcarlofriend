import React from "react";
import { View, Text, Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const SearchScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Input
        style={{ marginTop: 100 }}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="phone" />}
            size="md"
            m={2}
            _light={{
              color: "black",
            }}
            _dark={{
              color: "gray.300",
            }}
          />
        }
        placeholder="Input" // mx={4}
      />
    </View>
  );
};

export default SearchScreen;
