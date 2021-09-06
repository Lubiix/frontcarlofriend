import React, { Fragment, useState } from "react";
import {
  Box,
  Avatar,
  HStack,
  Image,
  Input,
  Icon,
  Button,
  Select,
  CheckIcon,
  VStack,
} from "native-base";
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { HOST } from "@env";

const SearchScreen = () => {
  console.log("HOOOOOOST", HOST);
  const [quartierSearch, setQuartierSearch] = useState("");
  const [typeUtilisateurSearch, setTypeUtilisateurSearch] = useState("");
  const [search, setSearch] = useState("");
  const [tableauSearch, setTableauSearch] = useState([]);

  console.log("SEARCHSCREEN TABLEAU SEARCH", tableauSearch);

  const handleSearch = async () => {
    console.log("click détecté search");
    console.log("search :", search);
    console.log("type utilisateur search", typeUtilisateurSearch);
    console.log("quartier search", quartierSearch);
    const envoiResearchBackendRaw = await fetch(
      `${HOST}/recherche-utilisateur`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameSearch: search,
          quartierSearch: quartierSearch,
          typeUtilisateurSearch: typeUtilisateurSearch,
        }),
      }
    );
    const responseBackendParsed = await envoiResearchBackendRaw.json();
    console.log("reponse backend search", responseBackendParsed);
    setTableauSearch(responseBackendParsed.userTableau);
  };

  const affichageRecherche = tableauSearch.map((user, i) => {
    return (
      <Box
        key={i}
        bg="#FFFFFF"
        p={4}
        style={{
          marginTop: 10,
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
            size="md"
            source={{
              uri: "https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg",
            }}
          ></Avatar>
          <Text
            style={{ flexShrink: 1, marginLeft: 5, fontWeight: "bold" }}
            color="#000000"
          >
            {user.prenom} {user.nom}
          </Text>
        </HStack>
        <Text style={{ marginLeft: 53 }}>{user.description}</Text>
      </Box>
    );
  });

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#62ADEB" }} />
      <View style={{ flexDirection: "row" }}>
        <Input
          onChangeText={(value) => setSearch(value)}
          value={search}
          my={2}
          ml={2}
          mr={1}
          placeholder="Recherche utilisateur"
          variant="filled"
          width="75%"
          bg="gray.200"
          borderRadius={10}
          py={1}
          px={2}
          _web={{
            _focus: {
              borderColor: "#62ADEB",
              style: { boxShadow: "none" },
            },
          }}
          InputLeftElement={
            <Icon
              size="sm"
              ml={2}
              size={5}
              color="gray.400"
              as={<Ionicons name="ios-search" />}
            />
          }
        />
        <Button
          onPress={() => handleSearch()}
          bg="#62ADEB"
          width="20%"
          my={2}
          height="57%"
          size="xs"
          _text={{ color: "white" }}
        >
          Recherche
        </Button>
      </View>
      <View style={{ justifyContent: "center", flexDirection: "row" }}>
        <Select
          width="45%"
          accessibilityLabel="Quartier"
          placeholder="Quartier d'activité"
          value={quartierSearch}
          onValueChange={(itemValue) => setQuartierSearch(itemValue)}
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
          width="45%"
          accessibilityLabel="TypeUser"
          placeholder="Particulier ou Commerçant"
          value={typeUtilisateurSearch}
          onValueChange={(itemValue) => setTypeUtilisateurSearch(itemValue)}
          _selectedItem={{
            bg: "cyan.600",
            endIcon: <CheckIcon size={4} />,
          }}
        >
          <Select.Item label="Particulier" value="Particulier" />
          <Select.Item label="Commerçant" value="Commercant" />
        </Select>
      </View>
      <ScrollView>{affichageRecherche}</ScrollView>
    </Fragment>
  );
};

export default SearchScreen;
