import React, { Fragment, useState, useEffect } from "react";
import Card from "../components/Card";
import { View, ScrollView } from "react-native";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Avatar, HStack, Stack, Modal, Input, Text } from "native-base";
import { HOST } from "@env";
import { connect } from "react-redux";

function FeedScreen(props) {
  // console.log("compteur like actif:", countLikePost);

  const [feedList, setFeedList] = useState([]);

  const [eventList, setEventList] = useState([]);
  // console.log("eventList:", eventList);

  const [commentList, setCommentList] = useState([]);
  // console.log("commentList", commentList);

  const [commentValue, setCommentValue] = useState("");
  console.log("commentaire récupéré:", commentValue);

  const [postId, setPostId] = useState("");

  console.log("postId:", postId);
  // console.log("feedlist:", feedList);

  const [showModal, setShowModal] = useState(false);
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
        color="#37b4aa"
        onPress={() => sendComment()}
      />
    </HStack>
  );

  // let comments = commentList.map((comment, index) => {
  //   if (postId == comment.post._id) {
  //     return (
  //       <HStack
  //         key={index}
  //         style={{
  //           space: 3,
  //           alignItems: "center",
  //           marginBottom: 2,
  //         }}
  //       >
  //         <Avatar
  //           mr={2}
  //           size="md"
  //           source={{
  //             uri: event.createur.profilePicture
  //               ? event.createur.profilePicture
  //               : "https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
  //           }}
  //         ></Avatar>
  //         <Stack>
  //           <Text style={{ flexShrink: 1 }} color="#000000" bold={true}>
  //             {comment.createur.nom} {comment.createur.prenom}
  //           </Text>
  //           <Text style={{ flexShrink: 1 }} my={2} color="#000000">
  //             {comment.content}
  //           </Text>
  //         </Stack>
  //       </HStack>
  //     );
  //   }
  // });
  let events = eventList.map((event, index) => {
    return (
      <Card
        key={event._id}
        item={event}
        handleComment={handleComment}
        isEvent
      />
    );
  });
  let postList = feedList.map((post) => {
    return <Card key={post._id} item={post} handleComment={handleComment} />;
  });

  const tableauEventsAndPosts = sortByDate(feedList.concat(eventList));

  let feedListSorted = tableauEventsAndPosts.map((postOrEvent) => {
    if (postOrEvent.dateFin === undefined) {
      return (
        <Card
          key={postOrEvent._id}
          item={postOrEvent}
          handleComment={handleComment}
        />
      );
    } else {
      return (
        <Card
          key={postOrEvent._id}
          item={postOrEvent}
          handleComment={handleComment}
          isEvent
        />
      );
    }
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
          color="#37b4aa"
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
      <ScrollView style={{ marginTop: 10 }}>{feedListSorted}</ScrollView>
      <Modal isOpen={showModal} onClose={() => closeComment()}>
        <Modal.Content width="100%">
          <Modal.CloseButton />
          <Modal.Header alignItems="center">Commentaires</Modal.Header>
          <Modal.Body>{/* <ScrollView>{comments}</ScrollView> */}</Modal.Body>
          <Modal.Footer>{commentInput}</Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}

function mapStateToProps(state) {
  console.log("récup state dans reducer token", state);
  return { token: state.token, filter: state.filter };
}

export default connect(mapStateToProps, null)(FeedScreen);
