import React from "react";
import { View, Text, Button} from 'react-native'

function FeedScreen(props) {
    const handleMap = () => {
        props.navigation.navigate("map")
    }
    const handleFeed =() => {
        props.navigation.navigate("feed")
    }
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text>Feed Screen</Text>
            <Button title="map" onPress={()=> handleMap()}></Button>
            <Button title="feed" onPress={()=> handleFeed()}></Button>
        </View>
    )
}

export default FeedScreen;
