import React, { Fragment } from "react";
import { SafeAreaView } from "react-native";
import { View, Text, Box } from "native-base";

const ChatScreen = () => {
  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#62ADEB" }} />
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
    </Fragment>
  );
};

export default ChatScreen;
