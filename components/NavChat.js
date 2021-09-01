import React from "react";
import ChatScreen from "../screens/ChatScreen";
import MessageScreen from "../screens/MessageScreen";

import { createStackNavigator } from "@react-navigation/stack";
const StackNavChat = createStackNavigator();

const NavChat = () => {
  return (
    <StackNavChat.Navigator screenOptions={{ headerShown: false }}>
      <StackNavChat.Screen name="messages" component={MessageScreen} />
      <StackNavChat.Screen name="chat" component={ChatScreen} />
    </StackNavChat.Navigator>
  );
};

export default NavChat;
