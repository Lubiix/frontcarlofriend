import React, { Fragment, useState } from "react";
import { View, Select, CheckIcon, Button } from "native-base";
import { SafeAreaView } from "react-native";
import {
  Input,
  Stack,
  TextArea,
  Center,
  Heading,
  NativeBaseProvider,
} from "native-base";

import { HOST } from "@env";

const AddPostScreen = (props) => {
  const [content, setContent] = useState("");
  console.log('content', content)

  const handleGoEvent = () => {
    props.navigation.navigate("event");
  };

  const handleValidateNewPost = async () => {
    console.log("click detecté");
    const sendNewPostToBackend = await fetch(`${HOST}/addPost`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `content=${content}`,
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
              
              value={content}
              h={150}
              placeholder="Text Area Placeholder"
            />
          </Stack>
          <Select
            minWidth={315}
            accessibilityLabel="Quartier"
            placeholder="Quartier"
            // value={quartierActivity}
            // onValueChange={(itemValue) => setQuartierActivity(itemValue)}
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
          <Select
            minWidth={315}
            accessibilityLabel="Commerce"
            placeholder="Commerce"
            // value={quartierActivity}
            // onValueChange={(itemValue) => setQuartierActivity(itemValue)}
            _selectedItem={{
              bg: "cyan.600",
              endIcon: <CheckIcon size={4} />,
            }}
          >
            <Select.Item label="L'enK" value="Fontvieille" />
            <Select.Item label="Carrefour" value="Condamine" />
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

export default AddPostScreen;
