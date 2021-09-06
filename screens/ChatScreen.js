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

import { connect } from "react-redux";

import socketIOClient from "socket.io-client";

const socket = socketIOClient(`${HOST}`);

const ChatScreen = (props) => {
  const [currentMessage, setCurrentMessage] = useState();
  const [listMessage, setListMessage] = useState([]);
  // console.log(">>currentMessage", currentMessage);
  // console.log(">>listMessage", listMessage);

  useEffect(() => {
    const requestMessages = async () => {
      console.log(">>HOST", HOST);
      const rawMessages = await fetch(`${HOST}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${props.token}`,
      });
      console.log("rawMessages", rawMessages);
      const messages = await rawMessages.json();
      // console.log("messages", messages);
      setListMessage([...listMessage, messages.messages]);
    };
    requestMessages();
  }, []);

  useEffect(() => {
    socket.on("sendMessageFromBack", (dataMessage) => {
      // console.log(">>dataMessage", dataMessage);
      setListMessage([...listMessage, dataMessage]);
    });
  }, [listMessage]);

  const handleSendMessage = () => {
    if (currentMessage.length > 0) {
      socket.emit("sendMessage", {
        message: currentMessage,
        token: props.token,
      });
      setCurrentMessage("");
    }
  };

  const listMessageItem = listMessage.map((message, i) => {
    return (
      <VStack key={i} space={2} width="100%" px={4} mb={5} bg="#FBFAFA">
        <Text>{message.message}</Text>
        <HStack justifyContent="space-between">
          <Heading size="xs">{message.user} </Heading>
          <Text>
            {message.dateWeek} - {message.dateHours}:{message.dateMinutes}
          </Text>
        </HStack>
      </VStack>
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
function mapStateToProps(state) {
  // console.log(">>state", state);
  return { token: state.token };
}
export default connect(mapStateToProps, null)(ChatScreen);
