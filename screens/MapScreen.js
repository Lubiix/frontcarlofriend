import React from "react";
import { View, Text, Button } from 'react-native'

function MapScreen(props) {
    const handleMap = () => {
        props.navigation.navigate("map")
    }
    const handleFeed =() => {
        props.navigation.navigate("feed")
    }
    return (
        <View>
            <Text>La map de Monaco</Text>
            <Button title="feed" onPress={()=> handleFeed()}></Button>
            <Button title="map" onPress={()=> handleMap()}></Button>
        </View>
    )
}

export default MapScreen;
