import React, { Fragment, useState, useEffect } from "react";
import MenuNav from "../components/MenuNav";
import { View, Text, Button, Dimensions } from "react-native";
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
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

  const [countLikePost, setCountLikePost] = useState(0);
  console.log("compteur like actif:", countLikePost);

  const handleLike = () => {
    setCountLikePost(countLikePost + 1);
  };
  return (
    <View style={{ flex: 1 }}>
      <HStack
        justifyContent="space-between"
        name="filternotif"
        style={{ flex: 0, padding: 10, marginTop: 40 }}
      >
        <MaterialIcons name="tune" size={24} color="black" />
        <Ionicons name="notifications" size={24} color="black" />
      </HStack>
      <HStack
        name="filtermap"
        style={{
          backgroundColor: "#FBFAFA",
          width: "20%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialCommunityIcons
          type="button"
          name="form-select"
          size={40}
          color="black"
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
      <Box
        bg="#FFFFFF"
        p={4}
        style={{ marginTop: 10, alignSelf: "center", width: 350 }}
      >
        <HStack
          style={{
            space: 3,
            alignItems: "center",
            marginBottom: 1,
          }}
        >
          <Avatar
            size="md"
            source={{
              uri: "https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg",
            }}
          ></Avatar>
          <Text style={{ flexShrink: 1 }} color="#000000">
            Prénom Nom
            <Entypo name="shop" size={24} color="black" /> @ nom d'enseigne +
            Qartier
          </Text>
        </HStack>
        <Text>
          Le texte de mon
          postzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
        </Text>
        <Box alignItems="center">
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/6/65/Baby.tux-800x800.png",
            }}
            alt="Alternate Text"
            size={"xl"}
            marginTop={5}
          />
        </Box>
        <HStack
          justifyContent="space-between"
          name="filternotif"
          style={{ flex: 0, padding: 10, marginTop: 40 }}
        >
          <Text>
            <AntDesign
              name="like2"
              size={24}
              color="black"
              onPress={() => handleLike()}
            />
            {countLikePost}
          </Text>
          <FontAwesome5 name="share-square" size={24} color="black" />
        </HStack>
      </Box>
    </View>
  );
}

export default FeedScreen;
