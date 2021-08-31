import React from "react";
import MenuNav from "../components/MenuNav";
import { View, Text, Button } from "react-native";
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Box,
  Center,
  Avatar,
  NativeBaseProvider,
  Badge,
  Flex,
  Spacer,
  HStack,
  Image,
  Stack,
} from "native-base";

function FeedScreen(props) {
  const handleMap = () => {
    props.navigation.navigate("map");
  };
  const handleFeed = () => {
    props.navigation.navigate("feed");
  };
  return (
    <View style={{ flex: 1 }}>
      <View>
        <HStack justifyContent="space-between">
          <MaterialIcons name="tune" size={24} color="black" />
          <Ionicons name="notifications" size={24} color="black" />
        </HStack>
      </View>
      <View style={{ flex: 1 }} alignItems="center">
        <HStack>
          <MaterialCommunityIcons
            type="button"
            name="form-select"
            size={40}
            color=" #62ADEB"
            title="feed"
            onPress={() => handleFeed()}
          />
          <MaterialCommunityIcons
            name="map-search-outline"
            size={40}
            color="black"
            title="map"
            onPress={() => handleMap()}
          />
        </HStack>
      </View>
      <View style={{ flex: 1 }}>
        <Box
          bg="#FFFFFF"
          p={4}
          _text={{
            fontSize: "md",
            fontWeight: "bold",
            color: "black",
          }}
          width="90%"
          justifyContent="center"
        >
          <HStack space={3} justifyContent="center">
            <Avatar
              size="md"
              source={{
                uri: "https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg",
              }}
            ></Avatar>
            <Text color="#000000">Prénom Nom</Text>
            <Entypo name="shop" size={24} color="black" />
            <Text color="#000000">@Qartier</Text>
          </HStack>
          <Text>Le texte de mon post</Text>
          <Image
            source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg",
            }}
            alt="Alternate Text"
            size={"xl"}
          />
        </Box>
      </View>
    </View>
  );
}

export default FeedScreen;
