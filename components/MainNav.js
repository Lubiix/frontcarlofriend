import { Stack } from "native-base";
import React from "react";
import { View } from "native-base";
import FeedScreen from "../screens/FeedScreen";
import MapScreen from "../screens/MapScreen";
import Event from "../screens/EventTest";

import { createStackNavigator } from "@react-navigation/stack";
const StackMain = createStackNavigator();
const MainNav = () => {
  return (
    <StackMain.Navigator screenOptions={{ headerShown: false }}>
      <StackMain.Screen name="feed" component={FeedScreen} />
      <StackMain.Screen name="map" component={MapScreen} />
      <StackMain.Screen name="Event" component={Event} />
    </StackMain.Navigator>
  );
};

export default MainNav;
