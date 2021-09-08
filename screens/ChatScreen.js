import React, { useEffect, useState, useRef } from "react";
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
  const { token } = props.route.params;
  // console.log(">>token", token);

  const [currentMessage, setCurrentMessage] = useState();
  const [listMessage, setListMessage] = useState([]);
  const [listMessageChargement, setListMessageChargement] = useState([]);
  // console.log(">>currentMessage", currentMessage);
  // console.log(">>listMessage", listMessage);
  // console.log(">>listMessageChargement", listMessageChargement);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const requestMessages = async () => {
      // console.log(">>HOST", HOST);
      const rawMessages = await fetch(`${HOST}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `tokenemetteur=${props.token}&tokenrecepteur=${token}`,
      });
      const messages = await rawMessages.json();
      // console.log("messages", messages);
      setListMessageChargement(messages.messages);
    };
    requestMessages();
  }, []);

  const socketAddToListMessage = (dataMessage) => {
    // console.log(">>dataMessage", dataMessage);
    setListMessage([...listMessage, dataMessage]);
  };

  useEffect(() => {
    socket.on("sendMessageFromBack", socketAddToListMessage);
  }, [listMessage]);

  useEffect(() => {
    return () => {
      // console.log(">>destruction");
      socket.removeAllListeners();
    };
  }, []);

  const handleSendMessage = () => {
    if (currentMessage.length > 0) {
      socket.emit("sendMessage", {
        message: currentMessage,
        tokenEmetteur: props.token,
        tokenRecepteur: token,
      });
      setCurrentMessage("");
    }
  };

  const onScrollViewChange = () => {
    // console.log(">>onScrollViewChange");
    if (scrollViewRef) {
      scrollViewRef.current.scrollToEnd();
    }
  };

  const listMessageChargementItem = listMessageChargement.map((message, i) => {
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
          fontSize: "ld",
          fontSize: 12,
          fontWeight: "bold",
          color: "white",
        }}
        alignItems="center"
        mb={3}
        bg="#62ADEB"
      >
        Conversation
      </Box>

      <ScrollView
        style={{ flex: 1, marginTop: 10 }}
        ref={scrollViewRef}
        onContentSizeChange={() => onScrollViewChange()}
      >
        {listMessageChargementItem}
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
