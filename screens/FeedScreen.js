import React, { Fragment, useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import { View, ScrollView } from "react-native";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Avatar,
  HStack,
  Stack,
  Modal,
  Input,
  Text,
  KeyboardAvoidingView,
} from "native-base";
import { HOST } from "@env";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

function FeedScreen(props) {
  // console.log("compteur like actif:", countLikePost);

  const [feedList, setFeedList] = useState([]);
  const [postId, setPostId] = useState("");

  const [eventList, setEventList] = useState([]);
  // console.log("eventList:", eventList);
  const [commentList, setCommentList] = useState([]);
  // console.log("commentList", commentList);
  const [commentValue, setCommentValue] = useState("");
  // console.log("commentaire récupéré:", commentValue);
  // console.log("postId:", postId);
  // console.log("feedlist:", feedList);

  const [isEvent, setIsEvent] = useState(false);

  const [showModal, setShowModal] = useState(false);
  console.log("HOOOOOOST", HOST);

  const scrollViewRef = useRef(null);

  const onScrollViewChange = () => {
    // console.log(">>onScrollViewChange");
    if (scrollViewRef) {
      scrollViewRef.current.scrollToEnd();
    }
  };

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
  const handleComment = (idPost, isEvent = false) => {
    // console.log("click comment", idPost);
    setShowModal(true);
    setPostId(idPost);
    setIsEvent(isEvent);
  };

  const closeComment = () => {
    setShowModal(false);
  };

  const [commentSent, setCommentSent] = useState(false);
  //ENVOI COMMENTAIRE AU BACK VIA ROUTE /comment
  const sendComment = async () => {
    // console.log(
    //   "commentaire envoyé à /comment",
    //   HOST,
    //   commentValue,
    //   props.token,
    //   postId
    // );
    const userComment = await fetch(`${HOST}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `comment=${commentValue}&token=${props.token}&postId=${postId}&isEvent=${isEvent}`,
    });
    setCommentValue("");
    setCommentSent(true);
  };
  // const handleComment = (idPost) => {
  //   console.log("click comment");
  //   setShowModal(true);
  //   setPostId(idPost);
  // };

  // const closeComment = () => {
  //   setShowModal(false);
  // };

  //ENVOI COMMENTAIRE AU BACK VIA ROUTE /comment

  function sortByDate(arr) {
    arr.sort(function (a, b) {
      return Number(new Date(b.date)) - Number(new Date(a.date));
    });
    return arr;
  }
  const isFocused = useIsFocused();
  console.log("isFocused", isFocused);
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
      // console.log("tous les évènements :", allEventData);
      setCommentSent(false);
      setFeedList(sortByDate(allPostData));
      setEventList(sortByDate(allEventData));
      setCommentList(allCommentData);
    };
    requestFeed();
  }, [isFocused, commentSent]);

  let commentInput = (
    <HStack
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
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

  // let events = eventList.map((event, index) => {
  //   return (
  //     <Card
  //       key={event._id}
  //       item={event}
  //       handleComment={handleComment}
  //       isEvent
  //     />
  //   );
  // });
  // let postList = feedList.map((post) => {
  //   return <Card key={post._id} item={post} handleComment={handleComment} />;
  // });
  let events = eventList.map((event, index) => {
    return <Card key={event._id} item={event} isEvent />;
  });
  let postList = feedList.map((post) => {
    return <Card key={post._id} item={post} />;
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
          isEvent
          handleComment={handleComment}
        />
      );
    }
  });

  let comments = commentList.map((comment, index) => {
    // console.log("COMMENT" + index, comment);
    const item = comment.post || comment.event;
    // console.log("comparaison ID " + index, item._id, " ", postId);
    // console.log("ITEM", item);
    if (postId === item._id) {
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
              uri: comment.createur.profilePicture
                ? comment.createur.profilePicture
                : "https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
            }}
          ></Avatar>
          <Stack>
            <Text style={{ flexShrink: 1 }} color="#000000" bold={true}>
              {comment.createur.nameSearch}
            </Text>
            <Text style={{ flexShrink: 1 }} my={2} color="#000000">
              {comment.content}
            </Text>
          </Stack>
        </HStack>
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
      <Modal
        isOpen={showModal}
        onClose={() => closeComment()}
        height="48%"
        style={{ marginTop: 55 }}
      >
        <Modal.Content width="100%">
          <Modal.CloseButton />
          <Modal.Header alignItems="center">Commentaires</Modal.Header>
          <Modal.Body>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => onScrollViewChange()}
            >
              {comments}
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>{commentInput}</Modal.Footer>
        </Modal.Content>
      </Modal>
      <ScrollView style={{ marginTop: 10 }}>{feedListSorted}</ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  // console.log("récup state dans reducer token", state);
  return { token: state.token, filter: state.filter };
}

export default connect(mapStateToProps, null)(FeedScreen);
