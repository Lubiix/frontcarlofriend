import React, { useState, useEffect } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import {
  VStack,
  HStack,
  Avatar,
  Image,
  Text,
  NativeBaseProvider,
  Button,
  Icon,
  Box,
  Stack,
  Heading,
  List,
} from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { HOST } from "@env";

const Event = () => {
  const [showModal, setShowModal] = useState(false);
  // const { idEvent } = route.params;
  const [hasParticipated, setHasParticipated] = useState(false);
  const [informationEvent, setInformationEvent] = useState(null);
  useEffect(() => {
    const loadEvent = async () => {
      const rawUserPost = await fetch(`${HOST}/load-event`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `idEvent=${idEvent}`,
      });
      const userPost = await rawUserPost.json();
      setInformationEvent(userPost.event);
    };
    loadEvent();
  }, []);

  const handleParticipate = async () => {
    // const rawUserPost = await fetch(`${HOST}/participate-event`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: `token=${props.token}&idEvent=${idEvent}`,
    // });
    // const userPost = await rawUserPost.json();
    setHasParticipated(true);
  };

  const closeComment = () => {
    console.log("close comment");
    setShowModal(false);
  };

  const icon = <Icon as={Ionicons} name="checkmark" size={4} />;

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
          <Text color="gray.400">
            de {informationEvent.dateDebut} à {informationEvent.dateFin}
          </Text>
          <Text color="gray.400">
            {informationEvent.particants.length} participent
          </Text>
          <Heading size={["md", "lg", "md"]} noOfLines={2}>
            {informationEvent.nomEvenement}
          </Heading>
          <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
            {informationEvent.content}
          </Text>
        </Stack>
        <Button
          onPress={() => handleParticipate()}
          bg="#62ADEB"
          width="20%"
          mx={4}
          my={0}
          height="5%"
          size="xs"
          _text={{ color: "white" }}
          variant={hasParticipated ? "outline" : "solid"}
          endIcon={hasParticipated ? icon : null}
        >
          {hasParticipated ? "Participe" : "Participer"}
        </Button>
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

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(Event);
