import React, { Fragment } from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  Box,
  Input,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from "native-base";

const ChatScreen = () => {
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
      <ScrollView style={{ flex: 1, marginTop: 50 }}>
        {/* {listMessageItem} */}
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
              // onPress={handleClick}
            >
              Envoyer
            </Button>
          }
          placeholder="Message"
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
