import React, { Fragment } from "react";
import { View, SafeAreaView, Text, Button } from "react-native";
import MapView, {Marker} from "react-native-maps";

function MapScreen(props) {
  const handleMap = () => {
    props.navigation.navigate("map");
  };
  const handleFeed = () => {
    props.navigation.navigate("feed");
  };
  return (
    <Fragment>
    <SafeAreaView style={{ flex: 0, backgroundColor: "#62ADEB" }} />
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 43.7320395,
          longitude: 7.421953,
          latitudeDelta: 0.0014,
          longitudeDelta: 0.009,
        }}
      >
        <Marker
          
          pinColor="red"
          title="La Capsule"
          description="On code !"
          coordinate={{
            latitude: 43.7278585,
            longitude: 7.4115085
          }}
        />
      </MapView>

      <Button title="feed" onPress={() => handleFeed()}></Button>
      {/* <Button title="map" onPress={() => handleMap()}></Button> */}
    </View>
    </SafeAreaView>
    </Fragment>
  );
}

export default MapScreen;
