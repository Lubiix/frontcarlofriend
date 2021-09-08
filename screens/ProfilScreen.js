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
  console.log("State userPost", userPost);
  const [user, setUser] = useState({});
  console.log("user", user);
  const [countLikePost, setCountLikePost] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserPost = async () => {
      const rawUserPost = await fetch(`${HOST}/feed-profil`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${props.token}`,
      });
      const userPost = await rawUserPost.json();
      // console.log('userPost',userPost)
      setUserPost(userPost.userPosts);
      setUser(userPost.user);
    };
    fetchUserPost();
  }, [useIsFocused()]);

  const handleGoEdit = () => {
    props.navigation.navigate("edit");
  };

  let postList = userPost.map((post, index) => {
    // console.log("postList", postList);
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
                uri: user.profilePicture,
              }}
            ></Avatar>
            <Text style={{ flexShrink: 1 }} color="#000000">
              {user.prenom} {user.nom}
              <Entypo name="shop" size={24} color="black" /> @ nom d'enseigne +
              {post.quartier.name}
            </Text>
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
              onPress={() => handleComment()}
            >
              Commentaires
            </Button>
            <Modal isOpen={showModal} onClose={() => closeComment()}>
              <Modal.Content width="100%">
                <Modal.CloseButton />
                <Modal.Header alignItems="center">Commentaires</Modal.Header>
                <Modal.Body>test</Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal.Content>
            </Modal>
            <FontAwesome5 name="share-square" size={24} color="#B6B6B6" />
          </HStack>
        </Box>
      </VStack>
    );
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

        <HStack
          style={{ justifyContent: "center", marginBottom: 10, marginTop: 60 }}
          marginTop="3"
        >
          <Button
            onPress={() => handleGoEdit()}
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
        {postList}
      </Box>
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(ProfilScreen);
