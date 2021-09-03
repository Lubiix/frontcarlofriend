import React, { Fragment, useState } from "react";
import { View, Select, CheckIcon, Button, Text } from "native-base";
import { SafeAreaView } from "react-native";
import { Input, Stack, TextArea } from "native-base";
import DatePicker, { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { HOST } from "@env";
import { connect } from "react-redux";

const AddEventScreen = (props) => {
  const [startDate, setStartDate] = useState("");
  const [isDisplayStartDate, setIsDisplayStartDate] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [isDisplayEndDate, setIsDisplayEndDate] = useState("");
  const [content, setContent] = useState("");
  const [eventName, setEventName] = useState("");
  const [quartier, setQuartier] = useState("");

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
    const sendNewEventToBackend = await fetch(`${HOST}/event`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `content=${content}&quartier=${quartier}&token=${props.token}&nomEvenement=${eventName}&dateDebut=${startDate}&dateFin=${endDate}`,
    });
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
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#62ADEB" }} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
          <Button.Group
            variant="solid"
            isAttached
            space={6}
            mx={{
              base: "auto",
              md: 0,
            }}
          >
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
              bg="#62ADEB"
              style={{ color: "#62ADEB" }}
              _text={{
                color: "white",
              }}
            >
              Event
            </Button>
          </Button.Group>
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
          >
            Ajouter une photo
          </Button>
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
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

function mapStateToProps(state) {
  return { token: state.token };
}
export default connect(mapStateToProps, null)(AddEventScreen);
