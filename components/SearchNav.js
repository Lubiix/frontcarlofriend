import { Stack } from "native-base";
import React from "react";
import { View } from "native-base";
import SearchScreen from "../screens/SearchScreen";
import ProfilSearchScreen from "../screens/ProfilSearchScreen";

import { createStackNavigator } from "@react-navigation/stack";
const StackMain = createStackNavigator();
const SearchNav = () => {
  return (
    <StackMain.Navigator screenOptions={{ headerShown: false }}>
      <StackMain.Screen name="search" component={SearchScreen} />
      <StackMain.Screen name="profileSearched" component={ProfilSearchScreen} />
    </StackMain.Navigator>
  );
};

export default SearchNav;
