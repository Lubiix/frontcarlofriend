import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MainNav from "./MainNav";
import SearchScreen from "../screens/SearchScreen";
import AddPostScreen from "../screens/AddPostScreen";
import ProfilScreen from "../screens/ProfilScreen";
import MessageScreen from "../screens/MessageScreen";

const Tab = createBottomTabNavigator();

const MenuNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#62ADEB",
          tabBarinactiveTintColor: "#62ADEB",
          tabBarActiveBackgroundColor: "#FBFAFA",
          tabBarInactiveBackgroundColor: "#FBFAFA",
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === "Actualités") {
              iconName = "home";
            } else if (route.name === "Recherche") {
              iconName = "search";
            } else if (route.name === "Publier") {
              iconName = "add";
            } else if (route.name === "Messages") {
              iconName = "mail";
            } else if (route.name === "Profile") {
              iconName = "person";
            }

            return <Ionicons name={iconName} size={30} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Actualités" component={MainNav} />
        <Tab.Screen name="Recherche" component={SearchScreen} />
        <Tab.Screen name="Publier" component={AddPostScreen} />
        <Tab.Screen name="Messages" component={MessageScreen} />
        <Tab.Screen name="Profile" component={ProfilScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default MenuNav;
