import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

import Card from "../components/Card";
import {
  Box,
  Avatar,
  HStack,
  VStack,
  Image,
  Modal,
  Button,
  AspectRatio,
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
import { HOST } from "@env";
import { useIsFocused } from "@react-navigation/native";

const ProfilScreen = (props) => {
  const [userPost, setUserPost] = useState([]);
  // console.log("State userPost", userPost);
  const [userEvent, setUserEvent] = useState([]);
  console.log("State userEvent", userEvent);
  const [user, setUser] = useState({});
  // console.log("user", user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserPost = async () => {
      const rawUserPost = await fetch(`${HOST}/feed-profil`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${props.token}`,
      });
      const userPost = await rawUserPost.json();
      // console.log("userPost", userPost);
      setUserPost(userPost.userPosts);
      // console.log("userPost.userPost", userPost.userPosts);
      setUser(userPost.user);
      setUserEvent(userPost.userEvents);
    };
    fetchUserPost();
  }, [useIsFocused()]);

  const handleGoEdit = () => {
    props.navigation.navigate("edit");
  };
  const handleComment = (idPost) => {
    console.log("click comment");
    setShowModal(true);
    setPostId(idPost);
  };

  let postList = userPost.map((post) => {
    return <Card key={post.id} item={post} handleComment={handleComment} />;
  });

  let events = userEvent.map((event) => {
    return (
      <Card
        key={event._id}
        item={event}
        handleComment={handleComment}
        isEvent
      />
    );
  });
  function sortByDate(arr) {
    arr.sort(function (a, b) {
      return Number(new Date(b.date)) - Number(new Date(a.date));
    });
    return arr;
  }
  const tableauEventsAndPosts = sortByDate(userPost.concat(userEvent));

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
    <ScrollView>
      <Box>
        <AspectRatio ratio={16 / 9}>
          <Image
            roundedTop="lg"
            source={{
              uri: user.coverPicture
                ? user.coverPicture
                : "https://theamericangenius.com/wp-content/uploads/2013/04/facebook-cover-photo-white.jpg",
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
            Index={2}
            size="2xl"
            source={{
              uri: user.profilePicture
                ? user.profilePicture
                : "https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
            }}
          ></Avatar>
        </Box>
        <HStack marginTop="-100px" marginLeft="25px" width="50%">
          <Button
            position="relative"
            bg="#37b4aa"
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
            bg="#37b4aa"
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
        <HStack
          style={{ justifyContent: "center", marginBottom: 10, marginTop: 60 }}
          marginTop="3"
        >
          <Button
            onPress={() => handleGoEdit()}
            bg="#37b4aa"
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
        {feedListSorted}
      </Box>
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(ProfilScreen);
