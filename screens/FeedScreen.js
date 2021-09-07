import React, { Fragment, useState, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";
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
import { HOST } from "@env";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconBadge from "react-native-icon-badge";

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
      setFeedList(allPostData);
      setEventList(allEventData);
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
              uri: "https://manofmany.com/wp-content/uploads/2021/06/Hasbulla-Magomedov-2.jpg",
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
        <Text>{dateWeek}</Text>
        <Text>
          {dateHours}:{dateMinutes}
        </Text>
      </VStack>
    );
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
              marginBottom: 3,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Avatar
              size="lg"
              source={{
                uri: "https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg",
              }}
            ></Avatar>
            <VStack>
              <Text
                style={{ flexShrink: 1, justifyContent: "center" }}
                color="#000000"
              >
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
                uri: event.image
                  ? event.image
                  : "https://www.wallpapersun.com/wp-content/uploads/2021/05/Hasbulla-Wallpaper-13.jpg",
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
              onPress={() => handleComment(event._id)}
            >
              Commentaires
            </Button>
            <Button
              title="Aller à l'évènement"
              color="#62ADEB"
              onPress={() =>
                props.navigation.navigate("Event", { idEvent: event._id })
              }
            >
              Allez à l'évènement
            </Button>
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
      <VStack>
        <Text>{dateWeek}</Text>
        <Text>
          {dateHours}:{dateMinutes}
        </Text>
      </VStack>
    );
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
              marginBottom: 3,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Avatar
              size="lg"
              source={{
                uri: "https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg",
              }}
            ></Avatar>
            <VStack>
              <Text
                style={{ flexShrink: 1, justifyContent: "center" }}
                color="#000000"
              >
                {post.createur.prenom} {post.createur.nom}
              </Text>
              <Text>@ </Text>
              <Text>{post.quartier.name}</Text>
            </VStack>
            {datePost}
          </HStack>
          <Text>{post.content}</Text>
          <Box alignItems="center">
            <Image
              source={{
                uri: post.image
                  ? post.image
                  : "https://www.wallpapersun.com/wp-content/uploads/2021/05/Hasbulla-Wallpaper-13.jpg",
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
              onPress={() => handleComment(post._id)}
            >
              Commentaires
            </Button>
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
