import React, { Fragment, useState, useEffect } from "react";
import { ScrollView, Select, CheckIcon, Button } from "native-base";
import { SafeAreaView } from "react-native";
import { Stack, TextArea, Image } from "native-base";
import * as ImagePicker from "expo-image-picker";

import { HOST } from "@env";
import { connect } from "react-redux";

const AddPostScreen = (props) => {
  console.log("HOOOOOOST", HOST);
  const [content, setContent] = useState("");
  const [quartier, setQuartier] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const addPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("RESULT", result);

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
    console.log('click validate detecté')
    console.log("PHOTO URI", image);
    props.navigation.navigate("Actualités");
    if (image.length ) {
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

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#62ADEB" }} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, marginTop: 50 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Button.Group
            variant="solid"
            isAttached
            space={6}
            mx={{
              base: "auto",
              md: 0,
            }}
          >
            <Button
              bg="#62ADEB"
              style={{ color: "#62ADEB" }}
              mr={0}
              _text={{
                color: "white",
              }}
            >
              Post
            </Button>
            <Button
              bg="#62ADEB"
              style={{ color: "#62ADEB" }}
              _text={{
                color: "white",
              }}
              onPress={() => handleGoEvent()}
            >
              Event
            </Button>
          </Button.Group>
          <Stack space={4} w="80%">
            <TextArea
              onChange={handleInputUser}
              value={content}
              h={150}
              placeholder="Text Area Placeholder"
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
            bg="#62ADEB"
            style={{
              color: "#62ADEB",
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
            bg="#62ADEB"
            style={{
              color: "#62ADEB",
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
      </SafeAreaView>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(AddPostScreen);
