import React, { Fragment } from "react";
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
      <ScrollView style={{ flex: 1, marginTop: 10 }}>
        <HStack width="100%" px={4} mb={5} bg="#FBFAFA">
          <VStack space={2}>
            <Text>Salut?</Text>
            <Heading size="xs">Geoffroy </Heading>
          </VStack>
        </HStack>
        <HStack width="100%" px={4} mb={5} bg="#FBFAFA">
          <VStack space={2}>
            <Text>Ca va?</Text>
            <Heading size="xs">Axel</Heading>
          </VStack>
        </HStack>
        <HStack width="100%" px={4} mb={5} bg="#FBFAFA">
          <VStack space={2}>
            <Text>OKLM et toi?</Text>
            <Heading size="xs">Geoffroy</Heading>
          </VStack>
        </HStack>
        <HStack width="100%" px={4} mb={5} bg="#FBFAFA">
          <VStack space={2}>
            <Text>Tranquille</Text>
            <Heading size="xs">Axel</Heading>
          </VStack>
        </HStack>
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
