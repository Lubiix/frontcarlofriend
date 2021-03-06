import React, { Fragment, useState, useEffect } from "react";
import {
  ScrollView,
  Select,
  CheckIcon,
  Button,
  Box,
  HStack,
  Text,
  Icon,
} from "native-base";
import { SafeAreaView } from "react-native";
import { Stack, TextArea, Image, View } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";

import { HOST } from "@env";
import { connect } from "react-redux";

const AddPostScreen = (props) => {
  console.log("HOOOOOOST", HOST);
  const [content, setContent] = useState("");
  const [quartier, setQuartier] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  console.log("state status :", status);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
      //Si commercant on display le bouton event
      const rawUserStatus = await fetch(`${HOST}/get-user`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${props.token}`,
      });
      const userStatus = await rawUserStatus.json();
      setStatus(userStatus.searchUser.status);
    })();
  }, []);

  const addPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log("RESULT", result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleGoEvent = () => {
    props.navigation.navigate("event");
  };

  const handleInputUser = (message) => {
    // console.log("message", message.nativeEvent.text);
    setContent(message.nativeEvent.text);
  };

  const handleValidateNewPost = async () => {
    console.log("click validate detect??");
    console.log("PHOTO URI", image);
    props.navigation.navigate("feed");
    if (image.length) {
      var data = new FormData();
      await data.append("photo", {
        uri: image,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      console.log("DATA", data);

      const responseBackendPhoto = await fetch(`${HOST}/upload`, {
        method: "post",
        body: data,
      });
      const responseParsed = await responseBackendPhoto.json();
      console.log("RESPONSE PARSED", responseParsed);
      const sendNewPostToBackend = await fetch(`${HOST}/addPost`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          quartier: quartier,
          token: props.token,
          photoAdded: responseParsed.secure_url,
        }),
      });
      return;
    }
    const sendNewPostToBackend = await fetch(`${HOST}/addPost`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        token: props.token,
      }),
    });
    setContent("");
  };

  // Constante d'affichage bouton post/event selon status
  const buttonPublication =
    status === "Commercant" ? (
      <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
        <Button
          bg="#37b4aa"
          style={{ color: "#37b4aa" }}
          mr={0}
          _text={{
            color: "white",
          }}
        >
          Post
        </Button>
        <Button
          marginLeft="10px"
          bg="#37b4aa"
          style={{ color: "#37b4aa" }}
          _text={{
            color: "white",
          }}
          onPress={() => handleGoEvent()}
        >
          Event
        </Button>
      </View>
    ) : (
      <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
        <Button
          bg="#37b4aa"
          style={{ color: "#37b4aa" }}
          mr={0}
          _text={{
            color: "white",
          }}
        >
          Post
        </Button>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#37b4aa" }} />
      <Box mb={1} bg="#37b4aa">
        <HStack justifyContent="center" alignItems="center">
          <Text
            style={{
              fontSize: "ld",
              fontWeight: "bold",
              color: "white",
              fontSize: 20,
              padding: 12,
            }}
          >
            Publication
          </Text>
        </HStack>
      </Box>
      <ScrollView
        style={{ flex: 1, marginTop: 50 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {buttonPublication}
        <Stack space={4} w="80%">
          <TextArea
            onChange={handleInputUser}
            value={content}
            h={150}
            placeholder="Quoi de neuf ? "
          />
        </Stack>
        <Select
          minWidth={315}
          accessibilityLabel="Quartier"
          placeholder="Quartier"
          value={quartier}
          onValueChange={(itemValue) => setQuartier(itemValue)}
          _selectedItem={{
            bg: "cyan.600",
            endIcon: <CheckIcon size={4} />,
          }}
        >
          <Select.Item label="Fontvieille" value="Fontvieille" />
          <Select.Item label="Condamine" value="Condamine" />
          <Select.Item label="Le Port" value="Le Port" />
          <Select.Item label="Larvotto" value="Larvotto" />
          <Select.Item label="Casino" value="Casino" />
          <Select.Item label="Jardin Exotique" value="Jardin Exotique" />
          <Select.Item label="Saint-Roman" value="Saint-Roman" />
        </Select>
        <Button
          bg="#37b4aa"
          style={{
            color: "#37b4aa",
            margin: 10,
          }}
          mr={0}
          _text={{
            color: "white",
          }}
          onPress={() => addPhoto()}
        >
          Ajouter une photo
        </Button>
        {image ? (
          <Image
            source={{
              uri: image,
            }}
            alt="Alternate Text"
            size={"xs"}
          />
        ) : null}

        <Button
          bg="#37b4aa"
          style={{
            color: "#37b4aa",
            margin: 10,
          }}
          mr={0}
          _text={{
            color: "white",
          }}
          onPress={() => handleValidateNewPost()}
        >
          Poster
        </Button>
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(AddPostScreen);
