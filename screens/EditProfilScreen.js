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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const EditProfilScreen = (props) => {
  const activities = ["restauration", "chaussures"];
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [sexe, setSexe] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [email, setEmail] = useState("");
  const [dataUser, setDataUser] = useState({});
  const [imageProfil, setImageProfil] = useState("");
  const [imageCouverture, setImageCouverture] = useState("");

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

  const addPhotoProfil = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("RESULT", result);

    if (!result.cancelled) {
      setImageProfil(result.uri);
    }
  };

  const addPhotoCouverture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 7],
      quality: 1,
    });

    console.log("RESULT", result);

    if (!result.cancelled) {
      setImageCouverture(result.uri);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const rawUserInfo = await fetch(`${HOST}/display-user-info`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${props.token}`,
      });
      const userInfo = await rawUserInfo.json();
      setDataUser(userInfo.user);
    };
    fetchUserInfo();
  }, []);

  const handleValidateUpdate = async () => {
    // console.log("#1")
    // console.log("click detecté")
    console.log("click validate detecté");
    console.log("PHOTO URI", imageProfil);
    if (imageProfil.length && imageCouverture.length) {
      var dataProfile = new FormData();
      await dataProfile.append("photo", {
        uri: imageProfil,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      const responseBackendPhotoProfile = await fetch(`${HOST}/upload`, {
        method: "post",
        body: dataProfile,
      });
      const responseParsedProfile = await responseBackendPhotoProfile.json();
      console.log("RESPONSE PARSED", responseParsedProfile);
      var dataCouverture = new FormData();
      await dataCouverture.append("photo", {
        uri: imageCouverture,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      const responseBackendPhotoCouverture = await fetch(`${HOST}/upload`, {
        method: "post",
        body: dataCouverture,
      });
      const responseParsedCouverture =
        await responseBackendPhotoCouverture.json();
      console.log("RESPONSE PARSED", responseParsedCouverture);
      const rawfetchUpdateProfileCouverturePhoto = await fetch(
        `${HOST}/update-profil`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            token: props.token,
            photoProfil: responseParsedProfile.secure_url,
            photoCouverture: responseParsedCouverture.secure_url,
            civilite: sexe,
            dateDeNaissance: dateNaissance,
            email: email,
          }),
        }
      );
      props.navigation.navigate("profil");
      return;
    }
    if (imageProfil.length) {
      var dataProfile = new FormData();
      await dataProfile.append("photo", {
        uri: imageProfil,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      const responseBackendPhotoProfile = await fetch(`${HOST}/upload`, {
        method: "post",
        body: dataProfile,
      });
      const responseParsedProfile = await responseBackendPhotoProfile.json();
      console.log("RESPONSE PARSED", responseParsedProfile);
      const rawfetchUpdateProfileCouverturePhoto = await fetch(
        `${HOST}/update-profil`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            token: props.token,
            photoProfil: responseParsedProfile.secure_url,
            civilite: sexe,
            dateDeNaissance: dateNaissance,
            email: email,
          }),
        }
      );
      props.navigation.navigate("profil");
      return;
    }
    if (imageCouverture.length) {
      var dataCouverture = new FormData();
      await dataCouverture.append("photo", {
        uri: imageCouverture,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      const responseBackendPhotoCouverture = await fetch(`${HOST}/upload`, {
        method: "post",
        body: dataCouverture,
      });
      const responseParsedCouverture =
        await responseBackendPhotoCouverture.json();
      console.log("RESPONSE PARSED", responseParsedCouverture);
      const rawfetchUpdateProfileCouverturePhoto = await fetch(
        `${HOST}/update-profil`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            token: props.token,
            photoCouverture: responseParsedCouverture.secure_url,
            civilite: sexe,
            dateDeNaissance: dateNaissance,
            email: email,
          }),
        }
      );
      props.navigation.navigate("profil");
      return;
    }

    const rawfetchUpdateProfil = await fetch(`${HOST}/update-profil`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.token}&nom=${nom}&prenom=${prenom}&civilite=${sexe}&dateDeNaissance=${dateNaissance}&email=${email}`,
    });
    // console.log("#2")
    props.navigation.navigate("profil");
  };

  const handleDeconnexion = async () => {
    await AsyncStorage.removeItem("token");
    props.onDeleteToken();
    // props.navigation.navigate("Home");
  };

  const editProfil = (
    <Fragment>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={{ marginBottom: 5 }}>{dataUser.nom}</Text>
        <Input
          w="40%"
          mx={3}
          placeholder="Nom"
          onChangeText={(value) => setNom(value)}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
        <Text style={{ marginBottom: 5 }}>{dataUser.prenom}</Text>
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
          <Text style={{ marginLeft: 45, marginBottom: 5 }}>
            {dataUser.dateDeNaissance}
          </Text>
          <Input
            w="80%"
            mx={3}
            placeholder="Date de naissance"
            onChangeText={(value) => setDateNaissance(value)}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginLeft: 35, marginBottom: 5 }}>
            {dataUser.civilite}
          </Text>
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
        <Text style={{ marginLeft: 140, marginBottom: 5 }}>
          {dataUser.email}
        </Text>
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
          bg="#37b4aa"
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
              uri: dataUser.coverPicture
                ? dataUser.coverPicture
                : "https://theamericangenius.com/wp-content/uploads/2013/04/facebook-cover-photo-white.jpg",
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
              uri: dataUser.profilePicture
                ? dataUser.profilePicture
                : "https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
            }}
          ></Avatar>
        </Box>
        <HStack marginTop="-100px" marginLeft="25px" width="50%">
          <Button
            position="relative"
            bg="#37b4aa"
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
        <HStack marginTop="-45px" marginLeft="280px" width="50%">
          <Button
            onPress={() => handleDeconnexion()}
            position="relative"
            bg="#37b4aa"
            width="20%"
            my={2}
            height="100%"
            width="50%"
            size="xs"
            _text={{ color: "white" }}
          >
            Déconnexion
          </Button>
        </HStack>

        <HStack style={{ justifyContent: "center" }} marginTop="60px">
          <Button
            bg="#37b4aa"
            width="20%"
            my={2}
            mx={1}
            height="100%"
            width="40%"
            size="xs"
            _text={{ color: "white" }}
            onPress={() => addPhotoProfil()}
          >
            Edit photo de profil
          </Button>
          <Button
            bg="#37b4aa"
            width="20%"
            mx={1}
            my={2}
            height="100%"
            width="40%"
            size="xs"
            _text={{ color: "white" }}
            onPress={() => addPhotoCouverture()}
          >
            Edit photo de couverture
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

function mapDispatchToProps(dispatch) {
  return {
    onDeleteToken: function () {
      dispatch({ type: "deleteToken" });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfilScreen);
