import React, { Fragment, useState, useEffect } from "react";
import { View, Select, CheckIcon, Button } from "native-base";
import { SafeAreaView } from "react-native";
import {
  Input,
  Stack,
  TextArea,
  Center,
  Heading,
  NativeBaseProvider,
} from "native-base";
import DatePicker from "react-native-modern-datepicker";

const AddEventScreen = (props) => {
  const [startDate, setStartDate] = useState("");
  console.log("selectedBeginningDate", startDate);
  const [selectedEndDate, setSelectedEndDate] = useState("");
  console.log("selectedEndDate", selectedEndDate);
  const [isDisplayStartDate, setIsDisplayStartDate] = useState(false);
  console.log("isDisplayStartDate", isDisplayStartDate);

  const handleGoPost = () => {
    props.navigation.navigate("post");
  };

  const handleStartDate = () => {
    setIsDisplayStartDate(!isDisplayStartDate);
  };

 const handleDate = (dateStart) => {
   console.log("dateStart", dateStart)
   setStartDate(dateStart)
   setIsDisplayStartDate(!isDisplayStartDate)
 }

  if (isDisplayStartDate) {
    return (
      <DatePicker
      style={{ marginTop: 200 }}
      onSelectedChange={(dateStart) => handleDate(dateStart)}
      // onDateChange={() => setIsDisplayStartDate(false)}
    />
    )
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
          <Stack space={4} w="80%">
            <TextArea h={150} placeholder="Description Event" />
          </Stack>
          <Select
            minWidth={315}
            accessibilityLabel="Quartier"
            placeholder="Quartier"
            // value={quartierActivity}
            // onValueChange={(itemValue) => setQuartierActivity(itemValue)}
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
            style={{ color: "#62ADEB" }}
            _text={{
              color: "white",
            }}
            onPress={() => handleStartDate()}
          >
            Date Début
          </Button>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default AddEventScreen;
