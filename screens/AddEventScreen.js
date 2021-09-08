import React, { Fragment, useState, useEffect } from "react";
import {
  ScrollView,
  Select,
  CheckIcon,
  Button,
  Text,
  Image,
  View, 
  Box, 
  HStack
} from "native-base";
import { SafeAreaView } from "react-native";
import { Input, Stack, TextArea } from "native-base";
import DatePicker, {
  getToday,
  getFormatedDate,
} from "react-native-modern-datepicker";
import { HOST } from "@env";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";

const AddEventScreen = (props) => {
  const [startDate, setStartDate] = useState("");
  const [isDisplayStartDate, setIsDisplayStartDate] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [isDisplayEndDate, setIsDisplayEndDate] = useState("");
  const [content, setContent] = useState("");
  const [eventName, setEventName] = useState("");
  const [quartier, setQuartier] = useState("");
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const addPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("RESULT", result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleGoPost = () => {
    props.navigation.navigate("post");
  };

  //On prend l'input du nom de l'évenement
  const onChangeNameEvent = (value) => {
    setEventName(value);
  };
  //On prend l'input de la description de l'évenement
  const handleInputUser = (message) => {
    setContent(message.nativeEvent.text);
  };
  // On fetch pour envoyer les données au backend
  const handleValidateNewEvent = async () => {
    if (image.length) {
      var data = new FormData();
      await data.append("photo", {
        uri: image,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      console.log("DATA", data);

      const responseBackendPhoto = await fetch(`${HOST}/upload`, {
        method: "post",
        body: data,
      });
      const responseParsed = await responseBackendPhoto.json();
      const sendNewEventToBackend = await fetch(`${HOST}/event`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `content=${content}&quartier=${quartier}&token=${props.token}&nomEvenement=${eventName}&dateDebut=${startDate}&dateFin=${endDate}&image=${responseParsed.secure_url}`,
      });
      return;
    }
    setContent("");
    setEventName("");
    props.navigation.navigate("Actualités");
  };

  //On gére la date de fin/ display calendrier et le state
  const handleDisplayStartDate = () => {
    setIsDisplayStartDate(!isDisplayStartDate);
  };

  const handleStartDate = (dateStart) => {
    setStartDate(dateStart);
    setIsDisplayStartDate(!isDisplayStartDate);
  };

  if (isDisplayStartDate) {
    return (
      <DatePicker
        style={{ marginTop: 200 }}
        onSelectedChange={(dateStart) => handleStartDate(dateStart)}
        options={{
          backgroundColor: "#FBFAFA",
          textHeaderColor: "#62ADEB",
          textDefaultColor: "#B6B6B6",
          selectedTextColor: "#fff",
          mainColor: "#62ADEB",
          textSecondaryColor: "#B6B6B6",
          borderColor: "rgba(122, 146, 165, 0.1)",
        }}
      ></DatePicker>
    );
  }

  //On gére la date de fin/ display calendrier et le state
  const handleDisplayEndDate = () => {
    setIsDisplayEndDate(!isDisplayEndDate);
  };

  const handleEndDate = (dateEnd) => {
    setEndDate(dateEnd);
    setIsDisplayEndDate(!isDisplayEndDate);
  };

  if (isDisplayEndDate) {
    return (
      <DatePicker
        style={{ marginTop: 200 }}
        onSelectedChange={(dateEnd) => handleEndDate(dateEnd)}
        options={{
          backgroundColor: "#FBFAFA",
          textHeaderColor: "#62ADEB",
          textDefaultColor: "#B6B6B6",
          selectedTextColor: "#fff",
          mainColor: "#62ADEB",
          textSecondaryColor: "#B6B6B6",
          borderColor: "rgba(122, 146, 165, 0.1)",
        }}
      ></DatePicker>
    );
  }
  return (
    <View style={{ flex: 1 }}>
    <SafeAreaView style={{ backgroundColor: "#62ADEB" }} />
    <Box mb={1} bg="#62ADEB">
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
          Publication
        </Text>
      </HStack>
    </Box>
        <ScrollView
          style={{ flex: 1, marginTop: 50 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={{ flex: 1, flexDirection: "row", marginBottom:10 }}>
        <Button
          bg="#62ADEB"
          style={{ color: "#62ADEB" }}
          mr={0}
          _text={{
            color: "white",
          }}
          onPress={() => handleGoPost()}
        >
          Post
        </Button>
        <Button
          marginLeft="10px"
          bg="#62ADEB"
          style={{ color: "#62ADEB" }}
          _text={{
            color: "white",
          }}
        >
          Event
        </Button>
      </View>
          
          <Input
            w="80%"
            mx={3}
            placeholder="Nom de l'évenement"
            onChangeText={(value) => onChangeNameEvent(value)}
            style={{
              marginBottom: 10,
              marginTop: 10,
            }}
          />
          <Stack space={4} w="80%">
            <TextArea
              onChange={handleInputUser}
              value={content}
              h={150}
              placeholder="Description Event"
            />
          </Stack>
          <Select
            minWidth={315}
            accessibilityLabel="Quartier"
            placeholder="Quartier"
            value={quartier}
            onValueChange={(itemValue) => setQuartier(itemValue)}
            _selectedItem={{
              bg: "cyan.600",
              endIcon: <CheckIcon size={4} />,
            }}
          >
            <Select.Item label="Fontvieille" value="Fontvieille" />
            <Select.Item label="Condamine" value="Condamine" />
            <Select.Item label="Le Port" value="Le Port" />
            <Select.Item label="Larvotto" value="Larvotto" />
            <Select.Item label="Casino" value="Casino" />
            <Select.Item label="Jardin Exotique" value="Jardin Exotique" />
            <Select.Item label="Saint-Roman" value="Saint-Roman" />
          </Select>
          <Select
            minWidth={315}
            accessibilityLabel="Commerce"
            placeholder="Commerce"
            // value={quartierActivity}
            // onValueChange={(itemValue) => setQuartierActivity(itemValue)}
            _selectedItem={{
              bg: "cyan.600",
              endIcon: <CheckIcon size={4} />,
            }}
          >
            <Select.Item label="L'enK" value="Fontvieille" />
            <Select.Item label="Carrefour" value="Condamine" />
          </Select>
          <Button
            bg="#62ADEB"
            style={{
              color: "#62ADEB",
              margin: 10,
            }}
            mr={0}
            _text={{
              color: "white",
            }}
            onPress={() => addPhoto()}
          >
            Ajouter une photo
          </Button>
          {image ? (
            <Image
              source={{
                uri: image,
              }}
              alt="Alternate Text"
              size={"xs"}
            />
          ) : null}
          <Button
            bg="#62ADEB"
            style={{
              color: "#62ADEB",
              marginBottom: 10,
            }}
            _text={{
              color: "white",
            }}
            onPress={() => handleDisplayStartDate()}
          >
            Date Début
          </Button>
          <Text style={{ marginBottom: 10 }}>
            Début de l'évenement: {startDate}
          </Text>
          <Button
            bg="#62ADEB"
            style={{
              color: "#62ADEB",
              marginBottom: 10,
            }}
            _text={{
              color: "white",
            }}
            onPress={() => handleDisplayEndDate()}
          >
            Date Fin
          </Button>
          <Text>Fin de l'évenement: {endDate}</Text>
          <Button
            bg="#62ADEB"
            style={{
              color: "#62ADEB",
              margin: 10,
            }}
            mr={0}
            _text={{
              color: "white",
            }}
            onPress={() => handleValidateNewEvent()}
          >
            Créer l'évenement
          </Button>
        </ScrollView>
    
    </View>
  );
};

function mapStateToProps(state) {
  return { token: state.token };
}
export default connect(mapStateToProps, null)(AddEventScreen);
