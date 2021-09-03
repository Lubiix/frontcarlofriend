import React, { Fragment } from "react";
import { SafeAreaView } from "react-native";
import {
  Text,
  Box,
  HStack,
  VStack,
  Avatar,
  Heading,
  Button,
  Link,
} from "native-base";

const MessageScreen = (props) => {
  const handleGoChat = () => {
    console.log(">>click détécté");
    props.navigation.navigate("chat");
  };

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
        Messagerie
      </Box>
      <Link onPress={() => handleGoChat()}>
        <HStack width="100%" px={4} my={4}>
          <HStack space={2} alignItems="center">
            <Avatar color="white" bg={"secondary.700"}>
              GF
            </Avatar>
            <Heading size="sm">Geoffroy</Heading>
          </HStack>
        </HStack>
      </Link>
    </Fragment>
  );
};

export default MessageScreen;
