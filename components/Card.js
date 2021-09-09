import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { Dimensions, ScrollView } from "react-native";

import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";

import {
  Box,
  Avatar,
  HStack,
  VStack,
  Image,
  Text,
  Button,
  Modal,
  Input,
} from "native-base";
import { createParser } from "styled-system";
import { HOST } from "@env";

function Card({ item, isEvent = false, props }) {
  const [countLikePost, setCountLikePost] = useState(0);

  const [showModal, setShowModal] = useState(false);
  console.log("HOOOOOOST", HOST);

  const [postId, setPostId] = useState("");

  const [commentList, setCommentList] = useState([]);
  // console.log("commentList", commentList);

  const navigation = useNavigation();

  const handleLike = () => {
    setCountLikePost(countLikePost + 1);
  };
  const [commentValue, setCommentValue] = useState("");
  console.log("commentaire récupéré:", commentValue);

  const handleComment = (idPost) => {
    console.log("click comment");
    setShowModal(true);
    setPostId(idPost);
  };

  const closeComment = () => {
    setShowModal(false);
  };

  const sendComment = async () => {
    console.log(
      "commentaire envoyé à /comment",
      HOST,
      commentValue,
      props.token,
      postId
    );
    const userComment = await fetch(`${HOST}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `comment=${commentValue}&token=${props.token}&postId=${postId}`,
    });
    setCommentValue("");
  };

  let commentInput = (
    <HStack
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
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
        value={commentValue}
        onChangeText={(value) => setCommentValue(value)}
      />
      <Ionicons
        name="send"
        size={24}
        color="#62ADEB"
        onPress={() => sendComment()}
      />
    </HStack>
  );

  let comments = commentList.map((comment, index) => {
    if (postId == comment.item._id) {
      return (
        <HStack
          key={index}
          style={{
            space: 3,
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Avatar
            mr={2}
            size="md"
            source={{
              uri: item.createur.profilePicture
                ? item.createur.profilePicture
                : "https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
            }}
          ></Avatar>
          <Stack>
            <Text style={{ flexShrink: 1 }} color="#000000" bold={true}>
              {comment.createur.nom} {comment.createur.prenom}
            </Text>
            <Text style={{ flexShrink: 1 }} my={2} color="#000000">
              {comment.content}
            </Text>
          </Stack>
        </HStack>
      );
    }
  });
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
            color="#37b4aa"
            onPress={() => handleComment(item._id, isEvent)}
          />
          {isEvent && (
            <FontAwesome5
              name="location-arrow"
              size={24}
              color="#37b4aa"
              onPress={() =>
                navigation.navigate("Event", { idEvent: item._id })
              }
            />
          )}
          <Ionicons name="share-outline" size={28} color="#B6B6B6" />
        </HStack>
      </Box>
      <Modal isOpen={showModal} onClose={() => closeComment()}>
        <Modal.Content width="100%">
          <Modal.CloseButton />
          <Modal.Header alignItems="center">Commentaires</Modal.Header>
          <Modal.Body>
            <ScrollView>{comments}</ScrollView>
          </Modal.Body>
          <Modal.Footer>{commentInput}</Modal.Footer>
        </Modal.Content>
      </Modal>
    </VStack>
  );
}

export default Card;
