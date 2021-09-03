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
} from "native-base";
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

const ProfilScreen = (props) => {
  const [countLikePost, setCountLikePost] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalNotif, setShowModalNotif] = useState(false);

  const handleDeconnexion = async () => {
    await AsyncStorage.removeItem("token");
    props.onDeleteToken();
    // props.navigation.navigate("Home");
  };

  /*let postList = feedList.map((post, index) => {
    return (
      <VStack key={index}>
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
              {post.createur.prenom} {post.createur.nom}
              <Entypo name="shop" size={24} color="black" /> @ nom d'enseigne +
              {post.quartier.name}
            </Text>
          </HStack>
          <Text>{post.content}</Text>
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
      </VStack>
    );
  });*/

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Avatar
      marginTop="40px"
        size="md"
        source={{
          uri: "https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg",
        }}
      ></Avatar>
      <HStack>
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
      <ScrollView style={{ marginTop: 10 }}>{}</ScrollView>
    </View>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    onDeleteToken: function () {
      dispatch({ type: "deleteToken" });
    },
  };
}

export default connect(null, mapDispatchToProps)(ProfilScreen);
