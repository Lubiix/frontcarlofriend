import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import {
    Box,
    Center,
    Avatar,
    NativeBaseProvider,
    Badge,
    Flex,
    Spacer,
    HStack,
    VStack,
    Image,
    Stack,
    Modal,
    Input,
    Button,
    AspectRatio,
    Heading,
    Icon,
  } from "native-base";
  import { HOST } from "@env";

const EditProfilScreen = (props) => {
    const text = <Text>Edition Profil</Text>
    return (
        <Box>
      <AspectRatio ratio={16 / 9}>
        <Image
          roundedTop="lg"
          source={{
            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
          }}
          alt="image"
        />
      </AspectRatio>
      <Box
        marginTop="-60px"
        position="relative"
        style={{ alignItems: "center" }}
      >
        <Avatar
          zIndex={2}
          size="2xl"
          source={{
            uri: "https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg",
          }}
        ></Avatar>
      </Box>
      <HStack marginTop="-100px" marginLeft="25px" width="50%">
        <Button
          position="relative"
          bg="#62ADEB"
          width="20%"
          my={2}
          height="100%"
          width="40%"
          size="xs"
          _text={{ color: "white" }}
        >
          Quartier Favoris
        </Button>
      </HStack>
      <HStack marginTop="-45px" marginLeft="290px" width="50%">
        <Button
          position="relative"
          bg="#62ADEB"
          width="20%"
          my={2}
          height="100%"
          width="40%"
          size="xs"
          _text={{ color: "white" }}
        >
          Media
        </Button>
      </HStack>

      <HStack style={{ justifyContent: "center" }} marginTop="60px">
        <Button
          onPress={() => handleDeconnexion()}
          bg="#62ADEB"
          width="20%"
          my={2}
          height="100%"
          width="40%"
          size="xs"
          _text={{ color: "white" }}
        >
          Déconnexion
        </Button>
      </HStack>
      
      <HStack style={{ justifyContent: "center" }} marginTop="3">
        <Button
          bg="#62ADEB"
          width="20%"
          my={2}
          height="100%"
          width="40%"
          size="xs"
          _text={{ color: "white" }}
        >
          Edit
        </Button>
      </HStack>
      <ScrollView style={{ marginTop: 10 }}>{text}</ScrollView>
    </Box>
    );
};

export default EditProfilScreen;