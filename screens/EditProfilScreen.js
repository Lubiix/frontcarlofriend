import React, { useState, useEffect, Fragment } from "react";
import { ScrollView, View, Text } from "react-native";
import {
  Button,
  Input,
  Select,
  CheckIcon,
  Checkbox,
  Box,
  AspectRatio,
  Image,
  Avatar,
  HStack,
  VStack,
} from "native-base";
import { connect } from "react-redux";
import { HOST } from "@env";

const EditProfilScreen = (props) => {
  const activities = ["restauration", "chaussures"];
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [sexe, setSexe] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [email, setEmail] = useState("");
  const [dataUser, setDataUser] = useState({})
  
    useEffect(()=>{

    },[])

  const handleValidateUpdate = async () => {
    console.log("click detecté");
    const rawfetchUpdateProfil = await fetch(`${HOST}/update-profil`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.token}&nom=${nom}&prenom=${prenom}&civilite=${sexe}&dateDeNaissance=${dateNaissance}&email=${email}`,
    });
    const updatedProfil = await rawfetchUpdateProfil.json()
    props.navigation.navigate("profil");
  };

  const editProfil = (
    <Fragment>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={{ marginBottom: 5 }}>Violi</Text>
        <Input
          w="40%"
          mx={3}
          placeholder="Nom"
          onChangeText={(value) => setNom(value)}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
        <Text style={{ marginBottom: 5 }}>Maxime</Text>
        <Input
          w="40%"
          mx={3}
          placeholder="Prénom"
          onChangeText={(value) => setPrenom(value)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        <View>
          <Text style={{ marginLeft: 45, marginBottom: 5 }}>19/09/1990</Text>
          <Input
            w="80%"
            mx={3}
            placeholder="Date de naissance"
            onChangeText={(value) => setDateNaissance(value)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginLeft: 35, marginBottom: 5 }}>Homme</Text>
          <Select
            selectedValue={activities}
            minWidth={105}
            accessibilityLabel="Sexe"
            placeholder="Sexe"
            value={sexe}
            onValueChange={(itemValue) => setSexe(itemValue)}
            _selectedItem={{
              bg: "cyan.600",
              endIcon: <CheckIcon size={4} />,
            }}
          >
            <Select.Item label="Homme" value="Homme" />
            <Select.Item label="Femme" value="Femme" />
            <Select.Item label="Autre" value="Autre" />
          </Select>
        </View>
      </View>
      <View>
        <Text style={{ marginLeft: 140, marginBottom: 5 }}>maxime@mml.com</Text>
        <Input
          w="85%"
          mx={3}
          my={2}
          placeholder="email"
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <HStack style={{ justifyContent: "center" }} marginTop="3">
        <Button
          onPress={() => handleValidateUpdate()}
          bg="#62ADEB"
          width="20%"
          my={2}
          height="100%"
          width="40%"
          size="xs"
          _text={{ color: "white" }}
        >
          Valider
        </Button>
      </HStack>
    </Fragment>
  );

  return (
    <ScrollView>
      <Box>
        <AspectRatio ratio={16 / 9}>
          <Image
            roundedTop="lg"
            source={{
              uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
            }}
            alt="image"
          />
        </AspectRatio>
        <Box
          marginTop="-60px"
          position="relative"
          style={{ alignItems: "center" }}
        >
          <Avatar
            zIndex={2}
            size="2xl"
            source={{
              uri: "https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg",
            }}
          ></Avatar>
        </Box>
        <HStack marginTop="-100px" marginLeft="25px" width="50%">
          <Button
            position="relative"
            bg="#62ADEB"
            width="20%"
            my={2}
            height="100%"
            width="40%"
            size="xs"
            _text={{ color: "white" }}
          >
            Quartier Favoris
          </Button>
        </HStack>
        <HStack marginTop="-45px" marginLeft="290px" width="50%">
          <Button
            position="relative"
            bg="#62ADEB"
            width="20%"
            my={2}
            height="100%"
            width="40%"
            size="xs"
            _text={{ color: "white" }}
          >
            Media
          </Button>
        </HStack>

        <HStack style={{ justifyContent: "center" }} marginTop="60px">
          <Button
            onPress={() => handleDeconnexion()}
            bg="#62ADEB"
            width="20%"
            my={2}
            height="100%"
            width="40%"
            size="xs"
            _text={{ color: "white" }}
          >
            Déconnexion
          </Button>
        </HStack>

        <HStack style={{ justifyContent: "center" }} marginTop="3">
          <Button
            bg="#62ADEB"
            width="20%"
            my={2}
            height="100%"
            width="40%"
            size="xs"
            _text={{ color: "white" }}
          >
            Edit
          </Button>
        </HStack>
        {editProfil}
      </Box>
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return { token: state.token };
}
export default connect(mapStateToProps, null)(EditProfilScreen);
