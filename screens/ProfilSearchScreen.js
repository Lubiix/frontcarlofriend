import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Card from "../components/Card";
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

const ProfilSearchScreen = (props) => {
  const [userPost, setUserPost] = useState([]);
  console.log("State userPost", userPost);
  const [user, setUser] = useState({});
  console.log("user", user);
  const [countLikePost, setCountLikePost] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalNotif, setShowModalNotif] = useState(false);

  useEffect(() => {
    const fetchUserPost = async () => {
      const rawUserPost = await fetch(`${HOST}/feed-profil-search`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `idUser=${props.idUser}`,
      });
      const userPost = await rawUserPost.json();
      // console.log('userPost',userPost)
      setUserPost(userPost.userPosts);
      setUser(userPost.user);
    };
    fetchUserPost();
  }, []);

  const handleGoEdit = () => {
    props.navigation.navigate("edit");
  };

  let postList = userPost.map((post, index) => {
    console.log("postList", postList);
    return <Card key={post.id} item={post}  />;
  });

  return (
    <ScrollView style={{ marginTop: 10 }}>
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
            zIndex={2}
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
        <View style={{marginTop:50}}>{postList}</View>
      </Box>
    </ScrollView>
  );
};

function mapStateToProps(state) {
  console.log("récup state dans reducer token", state);
  return { idUser: state.idUser };
}

export default connect(mapStateToProps, null)(ProfilSearchScreen);
