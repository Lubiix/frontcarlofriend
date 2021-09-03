import React from "react";
import { View, Text, Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

const ProfilScreen = (props) => {
  const handleDeconnexion = async () => {
    await AsyncStorage.removeItem("token");
    props.onDeleteToken();
    // props.navigation.navigate("Home");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        onPress={() => handleDeconnexion()}
        bg="#62ADEB"
        width="20%"
        my={2}
        height="57%"
        size="xs"
        _text={{ color: "white" }}
      >
        Déconnexion
      </Button>
    </View>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    onDeleteToken: function () {
      dispatch({ type: "deleteToken" });
    },
  };
}

export default connect(null, mapDispatchToProps)(ProfilScreen);
