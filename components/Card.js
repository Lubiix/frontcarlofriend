import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { Dimensions } from "react-native";

import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";

import { Box, Avatar, HStack, VStack, Image, Text, Button } from "native-base";
import { createParser } from "styled-system";

function Card({ item, handleComment, isEvent = false }) {
  const [countLikePost, setCountLikePost] = useState(0);

  const navigation = useNavigation();

  const handleLike = () => {
    setCountLikePost(countLikePost + 1);
  };

  const screenWidth = Dimensions.get("screen").width;

  const date = item.date;
  const newDate = new Date(date);
  let dateHours = newDate.getHours();
  if (dateHours < 10) {
    dateHours = `0${dateHours}`;
  }
  let dateMinutes = newDate.getMinutes();
  if (dateMinutes < 10) {
    dateMinutes = `0${dateMinutes}`;
  }
  const dateWeek = newDate.toLocaleDateString();
  const datePost = (
    <VStack alignItems="center">
      <Text color="#B6B6B6" style={{ fontSize: 10 }}>
        {dateWeek} - {dateHours}:{dateMinutes}
      </Text>
    </VStack>
  );
  return (
    <VStack>
      <Box
        bg="#FFFFFF"
        p={4}
        style={{
          marginTop: 10,
        }}
      >
        <HStack
          style={{
            space: 3,
            marginBottom: 3,
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: "#B6B6B6",
            borderBottomWidth: 1,
          }}
        >
          <HStack
            style={{
              space: 3,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Avatar
              size="lg"
              source={{
                uri: item.createur.profilePicture
                  ? item.createur.profilePicture
                  : "https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
              }}
            ></Avatar>
            <VStack>
              <Text
                style={{ fontWeight: "bold", marginLeft: 5, fontSize: 18 }}
                color="#000000"
              >
                {item.createur.prenom} {item.createur.nom}
              </Text>
              <Text style={{ marginLeft: 5 }}>{item.quartier.name}</Text>
              {datePost}
            </VStack>
          </HStack>
        </HStack>
        <Text>{item.content}</Text>
        <Box alignItems="center">
          <Image
            source={{
              uri: item.image ? item.image : null,
            }}
            alt={"Alternate Text"}
            resizeMode="cover"
            size="2xl"
            marginTop={5}
            marginBottom={5}
            style={{
              width: screenWidth,
              maxHeight: 300,
            }}
          />
        </Box>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          name="likecommentshare"
          style={{ padding: 10, marginTop: 0 }}
        >
          <Text>
            <AntDesign
              name="like2"
              size={24}
              color="#B6B6B6"
              onPress={() => handleLike()}
            />
            {countLikePost}
          </Text>
          <MaterialCommunityIcons
            name="comment-multiple-outline"
            size={24}
            color="#62ADEB"
            onPress={() => handleComment(item._id)}
          />
          {isEvent && (
            <FontAwesome5
              name="location-arrow"
              size={24}
              color="#62ADEB"
              onPress={() =>
                navigation.navigate("Event", { idEvent: item._id })
              }
            />
          )}
          <Ionicons name="share-outline" size={28} color="#B6B6B6" />
        </HStack>
      </Box>
    </VStack>
  );
}

export default Card;