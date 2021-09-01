import React, { Fragment, useState } from "react";
import { View, Button, Input, Icon, Select, CheckIcon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { HOST } from "@env";

const SearchScreen = () => {
  const [quartierSearch, setQuartierSearch] = useState("");
  const [typeUtilisateurSearch, setTypeUtilisateurSearch] = useState("");
  const [search, setSearch] = useState("");
  const [tableauSearch, setTableauSearch] = useState([]);

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
  };
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
    </Fragment>
  );
};

export default SearchScreen;
