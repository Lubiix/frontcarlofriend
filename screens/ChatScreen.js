import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  Box,
  Input,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  HStack,
  VStack,
  Text,
  Heading,
} from "native-base";

import { HOST } from "@env";

import socketIOClient from "socket.io-client";

const socket = socketIOClient(`${HOST}`);

const ChatScreen = () => {
  const [currentMessage, setCurrentMessage] = useState();
  const [listMessage, setListMessage] = useState([]);
  console.log("currentMessage", currentMessage);

  useEffect(() => {
    socket.on("sendMessageFromBack", (message) => {
      setListMessage([...listMessage, message]);
    });
  }, [listMessage]);

  const handleSendMessage = () => {
    socket.emit("sendMessage", { message: currentMessage, pseudo: "GF" });
    setCurrentMessage("");
  };

  const listMessageItem = listMessage.map((message, i) => {
    return (
      <HStack key={i} width="100%" px={4} mb={5} bg="#FBFAFA">
        <VStack space={2}>
          <Text>{message.message}</Text>
          <Heading size="xs">{message.pseudo} </Heading>
        </VStack>
      </HStack>
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#62ADEB" }} />
      <Box
        p={4}
        _text={{
          fontSize: "md",
          fontWeight: "bold",
          color: "white",
        }}
        alignItems="center"
        mb={3}
        bg="#62ADEB"
      >
        Conversation
      </Box>

      <ScrollView style={{ flex: 1, marginTop: 10 }}>
        {listMessageItem}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Input
          type={"text"}
          InputRightElement={
            <Button
              ml={1}
              roundedLeft={0}
              roundedRight="md"
              onPress={() => handleSendMessage()}
              bg="#62ADEB"
              _text={{ color: "white" }}
            >
              Envoyer
            </Button>
          }
          placeholder="Message"
          onChangeText={(message) => setCurrentMessage(message)}
          value={currentMessage}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
