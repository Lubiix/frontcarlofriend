import React from "react";
import { View, Text, Button } from "react-native";
import MapView from "react-native-maps";

function MapScreen(props) {
  const handleMap = () => {
    props.navigation.navigate("map");
  };
  const handleFeed = () => {
    props.navigation.navigate("feed");
  };
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 43.7320395,
        longitude: 7.421953,
        latitudeDelta: 0.0014,
        longitudeDelta: 0.009,
      }}
    >
      <View style={{flex:1, justifyContent:"center", alignItems:"center" }}>
        <Button title="feed" onPress={() => handleFeed()}></Button>
        <Button title="map" onPress={() => handleMap()}></Button>
      </View>
    </MapView>
  );
}

export default MapScreen;
