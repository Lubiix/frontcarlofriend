import React, { Fragment } from "react";
import { SafeAreaView } from "react-native";
import { Text, Box, HStack, VStack, Avatar, Heading } from "native-base";

const MessageScreen = (props) => {
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
      <Box>
        <HStack width="100%" px={4}>
          <HStack space={2} alignItems="center">
            <Avatar color="white" bg={"secondary.700"}>
              GF
            </Avatar>
            <VStack>
              <Heading size="sm">Geoffroy</Heading>

              <Text>Waza</Text>
            </VStack>
          </HStack>
        </HStack>
      </Box>
    </Fragment>
  );
};

export default MessageScreen;
