import React, { Fragment, useState } from "react";
import { View, Select, CheckIcon, Button } from "native-base";
import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  Input,
  Stack,
  TextArea,
  Center,
  Heading,
  NativeBaseProvider,
  KeyboardAvoidingView,
} from "native-base";

import { HOST } from "@env";
import { connect } from "react-redux";

const AddPostScreen = (props) => {
  const [content, setContent] = useState("");
  const [quartier, setQuartier] = useState("");
  // console.log("quartier", quartier);

  const handleGoEvent = () => {
    props.navigation.navigate("event");
  };

  const handleInputUser = (message) => {
    console.log("message", message.nativeEvent.text);
    setContent(message.nativeEvent.text);
  };

  const handleValidateNewPost = async () => {
    // console.log("click detecté");
    setContent("");
    const sendNewPostToBackend = await fetch(`${HOST}/addPost`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `content=${content}&quartier=${quartier}&token=${props.token}`,
    });
  };

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#62ADEB" }} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
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
          >
            Ajouter une photo
          </Button>

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
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

function mapStateToProps(state) {
  console.log("addPost/ state", state);
  return { token: state.token };
}

export default connect(mapStateToProps, null)(AddPostScreen);
