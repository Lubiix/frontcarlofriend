import React, { Fragment } from "react";
import { View, SafeAreaView, Text, Button } from "react-native";
import MapView, {Marker} from "react-native-maps";
import { HStack } from 'native-base'
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";


function MapScreen(props) {
  const handleMap = () => {
    props.navigation.navigate("map");
  };
  const handleFeed = () => {
    props.navigation.navigate("feed");
  };
  return (
  
     <View style={{ flex: 1 }}>
    <HStack
        justifyContent="space-between"
        name="filternotif"
        style={{ flex: 0, padding: 10, marginTop: 40 }}
      >
        <MaterialIcons name="tune" size={24} color="#B6B6B6" />
        <Ionicons name="notifications" size={24} color="#B6B6B6" />
      </HStack>
      <HStack
        name="filtermap"
        style={{
          backgroundColor: "#FBFAFA",
          width: "25%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <MaterialCommunityIcons
          type="button"
          name="form-select"
          size={40}
          color="#B6B6B6"
          title="feed"
          onPress={() => handleFeed()}
        />
        <MaterialCommunityIcons
          name="map-search-outline"
          size={40}
          color="#62ADEB"
          title="map"
          onPress={() => handleMap()}
        />
      </HStack>
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
     </View> 
   
   
  );
}

export default MapScreen;
