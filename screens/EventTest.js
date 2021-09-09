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
  View,
} from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { HOST } from "@env";

const Event = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { idEvent } = props.route.params;
  const [hasParticipated, setHasParticipated] = useState(false);
  const [informationEvent, setInformationEvent] = useState({
    content: "",
    particants: [],
  });
  const [nombreParticipants, setNombreParticipants] = useState(0);
  console.log(">>>>sate event image", informationEvent.image);
  const [commentairesEvent, setCommentairesEvent] = useState([]);

  console.log("route.params", props.route.params);
  useEffect(() => {
    const loadEvent = async () => {
      const rawEvent = await fetch(`${HOST}/load-event`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `idEvent=${idEvent}`,
      });
      const eventParsed = await rawEvent.json();
      console.log("image event", eventParsed);
      setInformationEvent(eventParsed.event);
      setNombreParticipants(eventParsed.event.particants.length);
      const rawCommentairesEvent = await fetch(`${HOST}/commentaires-event`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `idEvent=${idEvent}`,
      });
      const commentairesParsed = await rawCommentairesEvent.json();
      setCommentairesEvent(commentairesParsed.commentList);
    };
    loadEvent();
  }, []);

  const handleParticipate = async () => {
    const rawUserPost = await fetch(`${HOST}/participate-event`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.token}&idEvent=${idEvent}`,
    });
    const userPost = await rawUserPost.json();
    setHasParticipated(true);
    setNombreParticipants(nombreParticipants + 1);
  };

  const closeComment = () => {
    console.log("close comment");
    setShowModal(false);
  };

  //Formatage Date

  const date = informationEvent.dateDebut;
  const newDate = new Date(date);
  let dateHours = newDate.getHours();
  if (dateHours < 10) {
    dateHours = `0${dateHours}`;
  }
  let dateMinutes = newDate.getMinutes();
  if (dateMinutes < 10) {
    dateMinutes = `0${dateMinutes}`;
  }
  const dateWeek = newDate.toLocaleDateString();

  const dateEventDebut = `${dateWeek} à ${dateHours}:${dateMinutes}`;

  //Formatage Date

  const dateDeFin = informationEvent.dateFin;
  const newDateFin = new Date(dateDeFin);
  let dateHoursFin = newDateFin.getHours();
  if (dateHoursFin < 10) {
    dateHoursFin = `0${dateHoursFin}`;
  }
  let dateMinutesFin = newDateFin.getMinutes();
  if (dateMinutesFin < 10) {
    dateMinutesFin = `0${dateMinutesFin}`;
  }
  const dateWeekFin = newDateFin.toLocaleDateString();

  const dateEventFin = `${dateWeekFin} à ${dateHoursFin}:${dateMinutesFin}`;

  const icon = <Icon as={Ionicons} name="checkmark" size={4} />;

  let comments = commentairesEvent.map((comment, index) => {
    if (props.idEvent === comment.event._id) {
      return (
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
                  uri: comment.createur.profilePicture
                    ? comment.createur.profilePicture
                    : "https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
                }}
              ></Avatar>
              <Stack>
                <Text style={{ flexShrink: 1 }} color="#000000" bold={true}>
                  {comment.createur.prenom} {comment.createur.nom}
                </Text>
                <Text style={{ flexShrink: 1 }} my={2} color="#000000">
                  {comment.content}
                </Text>
              </Stack>
            </HStack>
          </Box>
        </List.Item>
      );
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#37b4aa" }} />
      <Box mb={1} bg="#37b4aa">
        <HStack justifyContent="center" alignItems="center">
          <Text
            style={{
              fontSize: "ld",
              fontWeight: "bold",
              color: "white",
              fontSize: 20,
              padding: 12,
            }}
          >
            Evenement
          </Text>
        </HStack>
      </Box>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <SafeAreaView style={{ flex: 0, backgroundColor: "#37b4aa" }} />
        <Box bg="white" shadow={2} rounded="lg" width="100%">
          <Image
            source={{
              uri: informationEvent.image
                ? informationEvent.image
                : "https://manofmany.com/wp-content/uploads/2021/06/Hasbulla-Magomedov-2.jpg",
            }}
            alt="image base"
            resizeMode="cover"
            height={150}
            roundedTop="md"
          />
          <Stack space={4} p={[4, 4, 8]}>
            <Text color="gray.400">
              du {dateEventDebut} au {dateEventFin}
            </Text>
            <Text color="gray.400">{nombreParticipants} participent</Text>
            <Heading size={["md", "lg", "md"]} noOfLines={2}>
              {informationEvent.nomEvenement}
            </Heading>
            <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
              {informationEvent.content}
            </Text>
          </Stack>
          <Button
            onPress={() => handleParticipate()}
            bg="#37b4aa"
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
            {comments}
          </List>
        </Box>
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(Event);
