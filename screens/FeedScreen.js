import React, { Fragment, useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
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
  Button,
  Text,
} from "native-base";
import { HOST } from "@env";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconBadge from "react-native-icon-badge";
import { marginLeft } from "styled-system";

function FeedScreen(props) {
  console.log("HOOOOOOST", HOST);
  const handleNavigEvent = function () {
    console.log("click");
    setShowModalNotif(false);
    props.navigation.navigate("Event");
  };

  const handleMap = () => {
    props.navigation.navigate("map");
  };
  const handleFeed = () => {
    props.navigation.navigate("feed");
  };
  const handleComment = (idPost) => {
    console.log("click comment");
    setShowModal(true);
    setPostId(idPost);
  };

  const closeComment = () => {
    setShowModal(false);
  };
  const handleLike = () => {
    setCountLikePost(countLikePost + 1);
  };

  const [countLikePost, setCountLikePost] = useState(0);
  // console.log("compteur like actif:", countLikePost);

  const [feedList, setFeedList] = useState([]);

  const [eventList, setEventList] = useState([]);
  console.log("eventList:", eventList);

  const [commentList, setCommentList] = useState([]);
  // console.log("commentList", commentList);

  const [commentValue, setCommentValue] = useState("");
  console.log("commentaire récupéré:", commentValue);

  const [postId, setPostId] = useState("");

  console.log("postId:", postId);
  // console.log("feedlist:", feedList);

  const [showModal, setShowModal] = useState(false);

  //ENVOI COMMENTAIRE AU BACK VIA ROUTE /comment
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
  function sortByDate(arr) {
    arr.sort(function (a, b) {
      return Number(new Date(b.date)) - Number(new Date(a.date));
    });
    console.log("tableau sorted maybe", arr);
    return arr;
  }

  //APPEL /feed POUR AFFICHER LES POSTS DANS LE FEED
  useEffect(() => {
    console.log("enter useeffect feed");
    const requestFeed = async () => {
      console.log("enter fetch request feed");
      const rawUserFeed = await fetch(`${HOST}/feed`);
      const userFeedParsed = await rawUserFeed.json();
      // console.log("réception /feed parsé:", userFeedParsed);
      const allPostData = userFeedParsed.posts;
      const allCommentData = userFeedParsed.comments;
      const allEventData = userFeedParsed.events;
      console.log("tous les évènements :", allEventData);
      setFeedList(sortByDate(allPostData));
      setEventList(sortByDate(allEventData));
      setCommentList(allCommentData);
    };
    requestFeed();
  }, []);

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
    if (postId == comment.post._id) {
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
              uri: event.createur.profilePicture
                ? event.createur.profilePicture
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
  let events = eventList.map((event, index) => {
    const date = event.date;
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
    const dateEvent = (
      <VStack>
        <Text>
          {dateWeek} - {dateHours}:{dateMinutes}
        </Text>
      </VStack>
    );
    return (
      <VStack key={event._id}>
        <Box
          bg="#FFFFFF"
          p={4}
          style={{
            marginTop: 10,
            alignSelf: "center",
          }}
        >
          <HStack
            style={{
              space: 3,
              marginBottom: 3,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Avatar
              size="lg"
              source={{
                uri: event.createur.profilePicture
                  ? event.createur.profilePicture
                  : "https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
              }}
            ></Avatar>
            <VStack>
              <Text style={{ fontWeight: "bold" }} color="#000000">
                {event.createur.prenom} {event.createur.nom}
              </Text>
              <Text>@ </Text>
              <Text>{event.quartier.name}</Text>
            </VStack>
            {dateEvent}
          </HStack>
          <Text>{event.content}</Text>
          <Box alignItems="center">
            <Image
              source={{
                uri: event.image ? event.image : null,
              }}
              alt="Alternate Text"
              size={"xl"}
              marginTop={5}
            />
          </Box>
          <HStack
            justifyContent="space-between"
            alignItems="flex-end"
            name="likecommentshare"
            style={{ adding: 10, marginTop: 40 }}
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
            <VStack>
              <Button
                title="Commentaires"
                bg="#62ADEB"
                my={2}
                onPress={() => handleComment(event._id)}
              >
                Commentaires
              </Button>
              <Button
                title="Aller à l'évènement"
                bg="#62ADEB"
                onPress={() =>
                  props.navigation.navigate("Event", { idEvent: event._id })
                }
              >
                Allez à l'évènement
              </Button>
            </VStack>
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
            <FontAwesome5 name="share-square" size={24} color="#B6B6B6" />
          </HStack>
        </Box>
      </VStack>
    );
  });
  let postList = feedList.map((post, index) => {
    const date = post.date;
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
      <VStack key={post._id}>
        <Box
          bg="#FFFFFF"
          p={4}
          style={{
            marginTop: 10,
            alignSelf: "center",
            width: 410,
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
                marginBottom: 3,
                alignItems: "center",
              }}
            >
              <Avatar
                size="lg"
                source={{
                  uri: post.createur.profilePicture
                    ? post.createur.profilePicture
                    : "https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
                }}
              ></Avatar>
              <VStack>
                <Text
                  style={{ fontWeight: "bold", marginLeft: 5, fontSize: 18 }}
                  color="#000000"
                >
                  {post.createur.prenom} {post.createur.nom}
                </Text>
                <Text style={{ marginLeft: 5 }}>{post.quartier.name}</Text>
                {datePost}
              </VStack>
            </HStack>
          </HStack>
          <Text>{post.content}</Text>
          <Box alignItems="center">
            <Image
              source={{
                uri: post.image ? post.image : null,
              }}
              alt="Alternate Text"
              size={"xl"}
              marginTop={5}
              marginBottom={5}
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
              onPress={() => handleComment(post._id)}
            />
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
  });

  return (
    <View style={{ flex: 1 }}>
      <HStack
        justifyContent="space-between"
        name="filternotif"
        style={{ flex: 0, padding: 10, marginTop: 40 }}
      >
        <MaterialIcons
          name="tune"
          size={24}
          color="#B6B6B6"
          onPress={() => props.navigation.navigate("Filter")}
        />
        <Ionicons
          name="notifications"
          size={24}
          color="#B6B6B6"
          onPress={() => props.navigation.navigate("Event")}
        />
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
      <ScrollView style={{ marginTop: 10 }}>
        {postList}
        {events}
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  console.log("récup state dans reducer token", state);
  return { token: state.token, filter: state.filter };
}

export default connect(mapStateToProps, null)(FeedScreen);
