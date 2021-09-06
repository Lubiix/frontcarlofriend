import React, { useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import {
  VStack,
  HStack,
  Avatar,
  Image,
  Text,
  NativeBaseProvider,
  AspectRatio,
  Center,
  Box,
  Stack,
  Heading,
  List,
} from "native-base";

const Event = () => {
  const [showModal, setShowModal] = useState(false);

  const handleComment = () => {
    console.log("click comment");
    setShowModal(true);
  };

  const closeComment = () => {
    console.log("close comment");
    setShowModal(false);
  };
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <SafeAreaView style={{ flex: 0, backgroundColor: "#62ADEB" }} />
      <Box bg="white" shadow={2} rounded="lg" maxWidth="100%">
        <Image
          source={{
            uri: "https://www.sportbible.com/cdn-cgi/image/width=720,quality=70,format=webp,fit=pad,dpr=1/https%3A%2F%2Fs3-images.sportbible.com%2Fs3%2Fcontent%2F55d4395260d17d5c415895d1f1310b30.png",
          }}
          alt="image base"
          resizeMode="cover"
          height={150}
          roundedTop="md"
        />
        <Stack space={4} p={[4, 4, 8]}>
          <Text color="gray.400">Vendredi 10 Septembre de 18h30 à 19h30</Text>
          <Heading size={["md", "lg", "md"]} noOfLines={2}>
            DEMO DAY LA CAPSULE NOUS RENDEZ PAS DINGOS
          </Heading>
          <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
            Présentation de l'application CarloFriends par la meilleure équipe
            de développement de France
          </Text>
        </Stack>
        <List mt={2} my={2}>
          <List.Item>
            <Box
              bg="#FFFFFF"
              p={4}
              style={{
                marginTop: 2,
                alignSelf: "center",
                width: 350,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 10,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <HStack
                style={{
                  space: 3,
                  alignItems: "center",
                  marginBottom: 0,
                }}
              >
                <Avatar
                  mr={2}
                  size="md"
                  source={{
                    uri: "https://manofmany.com/wp-content/uploads/2021/06/Hasbulla-Magomedov-2.jpg",
                  }}
                ></Avatar>
                <Stack>
                  <Text style={{ flexShrink: 1 }} color="#000000" bold={true}>
                    Piras Axel
                  </Text>
                  <Text style={{ flexShrink: 1 }} my={2} color="#000000">
                    Ambiance Scandale
                  </Text>
                </Stack>
              </HStack>
            </Box>
          </List.Item>
          <List.Item>
            <Box
              bg="#FFFFFF"
              p={4}
              style={{
                marginTop: 2,
                alignSelf: "center",
                width: 350,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <HStack
                style={{
                  space: 3,
                  alignItems: "center",
                  marginBottom: 0,
                }}
              >
                <Avatar
                  mr={2}
                  size="md"
                  source={{
                    uri: "https://manofmany.com/wp-content/uploads/2021/06/Hasbulla-Magomedov-2.jpg",
                  }}
                ></Avatar>
                <Stack>
                  <Text style={{ flexShrink: 1 }} color="#000000" bold={true}>
                    Piras Axel
                  </Text>
                  <Text style={{ flexShrink: 1 }} my={2} color="#000000">
                    Ambiance Scandale
                  </Text>
                </Stack>
              </HStack>
            </Box>
          </List.Item>
          <List.Item>
            <Box
              bg="#FFFFFF"
              p={4}
              style={{
                marginTop: 2,
                alignSelf: "center",
                width: 350,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <HStack
                style={{
                  space: 3,
                  alignItems: "center",
                  marginBottom: 1,
                }}
              >
                <Avatar
                  mr={2}
                  size="md"
                  source={{
                    uri: "https://manofmany.com/wp-content/uploads/2021/06/Hasbulla-Magomedov-2.jpg",
                  }}
                ></Avatar>
                <Stack>
                  <Text style={{ flexShrink: 1 }} color="#000000" bold={true}>
                    Piras Axel
                  </Text>
                  <Text style={{ flexShrink: 1 }} my={2} color="#000000">
                    Ambiance Scandale
                  </Text>
                </Stack>
              </HStack>
            </Box>
          </List.Item>
          <List.Item>
            <Box
              bg="#FFFFFF"
              p={4}
              style={{
                marginTop: 2,
                alignSelf: "center",
                width: 350,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <HStack
                style={{
                  space: 3,
                  alignItems: "center",
                  marginBottom: 0,
                }}
              >
                <Avatar
                  mr={2}
                  size="md"
                  source={{
                    uri: "https://manofmany.com/wp-content/uploads/2021/06/Hasbulla-Magomedov-2.jpg",
                  }}
                ></Avatar>
                <Stack>
                  <Text style={{ flexShrink: 1 }} color="#000000" bold={true}>
                    Piras Axel
                  </Text>
                  <Text style={{ flexShrink: 1 }} my={2} color="#000000">
                    Ambiance Scandale
                  </Text>
                </Stack>
              </HStack>
            </Box>
          </List.Item>
        </List>
      </Box>
    </ScrollView>
  );
};

export default Event;
