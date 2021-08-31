import React from "react";
import AddEventScreen from "../screens/AddEventScreen";
import AddPostScreen from "../screens/AddPostScreen";

import { createStackNavigator } from "@react-navigation/stack";
const StackNavAdd = createStackNavigator();

const NavAdd = () => {
  return (

      <StackNavAdd.Navigator screenOptions={{ headerShown: false }}>
        <StackNavAdd.Screen name="post" component={AddPostScreen} />
        <StackNavAdd.Screen name="event" component={AddEventScreen} />
      </StackNavAdd.Navigator>

  );
};

export default NavAdd;
