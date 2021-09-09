import React, { Fragment, useState } from "react";
import { View, Button, Select, CheckIcon, Checkbox } from "native-base";
import { SafeAreaView, Text } from "react-native";
import { connect } from "react-redux";
import { HOST } from "@env";

const FilterScreen = (props) => {
  console.log("HOOOOOOST", HOST);
  const [quartiersFiltre, setQuartiersFiltre] = useState([]);
  const [typeUtilisateur, setTypeUtilisateur] = useState([]);
  const [typePost, setTypePost] = useState([]);

  const handleValidateFilter = async () => {
    console.log("click");
    props.onSendFilter({
      quartier: quartiersFiltre,
      typeUtilisateur: typeUtilisateur,
      typePost: typePost,
    });
  };

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#37b4aa" }} />
      <View
        style={{ flex: 0.7, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ marginTop: 15 }}>Quartier(s) :</Text>
        <Checkbox.Group
          my={5}
          onChange={setQuartiersFiltre}
          value={quartiersFiltre}
          accessibilityLabel="choose numbers"
          style={{
            maxWidth: "80%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Checkbox value="612c9c4b97af13e59b12845e" mx={1} my={1}>
            <Text style={{ marginLeft: 5 }}>Fontvieille</Text>
          </Checkbox>
          <Checkbox value="612c9c6c97af13e59b12845f" mx={1} my={1}>
            <Text style={{ marginLeft: 5 }}>Condamine</Text>
          </Checkbox>
          <Checkbox value="612c9c7697af13e59b128460" mx={1} my={1}>
            <Text style={{ marginLeft: 5 }}>Le Port</Text>
          </Checkbox>
          <Checkbox value="612c9c8297af13e59b128461" mx={1} my={1}>
            <Text style={{ marginLeft: 5 }}>Larvotto</Text>
          </Checkbox>
          <Checkbox value="612c9c9497af13e59b128462" mx={1} my={1}>
            <Text style={{ marginLeft: 5 }}>Casino</Text>
          </Checkbox>
          <Checkbox value="612c9ca597af13e59b128463" mx={1} my={1}>
            <Text style={{ marginLeft: 5 }}>Jardin Exotique</Text>
          </Checkbox>
          <Checkbox value="612c9cb197af13e59b128464" mx={1} my={1}>
            <Text style={{ marginLeft: 5 }}>Saint-Roman</Text>
          </Checkbox>
        </Checkbox.Group>
        <Text style={{ marginTop: 15 }}>Type(s) d'utilisateur :</Text>
        <Checkbox.Group
          my={5}
          onChange={setTypeUtilisateur}
          value={typeUtilisateur}
          accessibilityLabel="choose numbers"
          style={{
            maxWidth: "80%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Checkbox value="particulier" mx={1} my={1}>
            <Text style={{ marginLeft: 5 }}>Particulier</Text>
          </Checkbox>
          <Checkbox value="commercant" mx={1} my={1}>
            <Text style={{ marginLeft: 5 }}>Commerçant</Text>
          </Checkbox>
        </Checkbox.Group>
        <Text style={{ marginTop: 15 }}>Type(s) de contenu :</Text>
        <Checkbox.Group
          my={5}
          onChange={setTypePost}
          value={typePost}
          accessibilityLabel="choose numbers"
          style={{
            maxWidth: "80%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Checkbox value="post" mx={1} my={1}>
            <Text style={{ marginLeft: 5 }}>Post</Text>
          </Checkbox>
          <Checkbox value="event" mx={1} my={1}>
            <Text style={{ marginLeft: 5 }}>Événement</Text>
          </Checkbox>
        </Checkbox.Group>
        <Button
          bg="#37b4aa"
          style={{
            color: "#37b4aa",
            margin: 10,
          }}
          mr={0}
          _text={{
            color: "white",
          }}
          onPress={() => handleValidateFilter()}
        >
          Valider
        </Button>
      </View>
    </Fragment>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    onSendFilter: function (objFilter) {
      dispatch({ type: "setFilter", filter: objFilter });
    },
  };
}

export default connect(null, mapDispatchToProps)(FilterScreen);
