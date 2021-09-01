import React, { Fragment, useState, useEffect } from "react";
import MenuNav from "../components/MenuNav";
import { View, Text, Button, Dimensions, ScrollView } from "react-native";
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
  VStack,
  Image,
  Stack,
  Modal,
  Input,
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

  const [value, setValue] = useState("");
  console.log("commentaire récupéré:", value);

  const userComment = (event) => setValue(event.target.value);
  console.log("userComment:");

  const [showModal, setShowModal] = useState(false);

  const handleComment = () => {
    console.log("click comment");
    setShowModal(true);
  };

  const closeComment = () => {
    console.log("close comment");
    setShowModal(false);
  };

  let commentInput = (
    <HStack>
      <Input
        w="80%"
        mx={3}
        placeholder="Ecrire un commentaire ..."
        _light={{
          placeholderTextColor: "blueGray.400",
        }}
        _dark={{
          placeholderTextColor: "blueGray.50",
        }}
        value={value}
        onChange={userComment}
      />
    </HStack>
  );

  let postList = (
    <VStack>
      <Box
        bg="#FFFFFF"
        p={4}
        style={{
          marginTop: 10,
          alignSelf: "center",
          width: 350,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
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
          name="likecommentshare"
          style={{ flex: 0, padding: 10, marginTop: 40 }}
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
          <Button
            title="Commentaires"
            color="#62ADEB"
            onPress={() => handleComment()}
          >
            Commentaires
          </Button>
          <Modal isOpen={showModal} onClose={() => closeComment()}>
            <Modal.Content width="100%">
              <Modal.CloseButton />
              <Modal.Header alignItems="center">Commentaires</Modal.Header>
              <Modal.Body>test</Modal.Body>
              <Modal.Footer>{commentInput}</Modal.Footer>
            </Modal.Content>
          </Modal>
          <FontAwesome5 name="share-square" size={24} color="#B6B6B6" />
        </HStack>
      </Box>
      <Box
        bg="#FFFFFF"
        p={4}
        style={{
          marginTop: 10,
          alignSelf: "center",
          width: 350,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
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
          name="likecommentshare"
          style={{ flex: 0, padding: 10, marginTop: 40 }}
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
          <FontAwesome5 name="share-square" size={24} color="#B6B6B6" />
        </HStack>
      </Box>
      <Box
        bg="#FFFFFF"
        p={4}
        style={{
          marginTop: 10,
          alignSelf: "center",
          width: 350,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
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
              color="#B6B6B6"
              onPress={() => handleLike()}
            />
            {countLikePost}
          </Text>
          <FontAwesome5 name="share-square" size={24} color="#B6B6B6" />
        </HStack>
      </Box>
    </VStack>
  );

  return (
    <View style={{ flex: 1 }}>
      <HStack
        justifyContent="space-between"
        name="filternotif"
        style={{ flex: 0, padding: 10, marginTop: 40 }}
      >
        <MaterialIcons name="tune" size={24} color="#B6B6B6" />
        <Ionicons name="notifications" size={24} color="#B6B6B6" />
      </HStack>
      <HStack
        name="filtermap"
        style={{
          backgroundColor: "#FBFAFA",
          width: "25%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <MaterialCommunityIcons
          type="button"
          name="form-select"
          size={40}
          color="#62ADEB"
          title="feed"
          onPress={() => handleFeed()}
        />
        <MaterialCommunityIcons
          name="map-search-outline"
          size={40}
          color="#B6B6B6"
          title="map"
          onPress={() => handleMap()}
        />
      </HStack>
      <ScrollView style={{ marginTop: 10 }}>{postList}</ScrollView>
    </View>
  );
}

export default FeedScreen;
