import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import MainNav from "./MainNav";
import SearchScreen from "../screens/SearchScreen";
import NavChat from "./NavChat";
import NavAdd from "./NavAdd";
import ProfilScreen from "../screens/ProfilScreen";
import NavProfil from "./NavProfil";
import SearchNav from "./SearchNav";

const Tab = createBottomTabNavigator();

const MenuNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
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
        <Tab.Screen name="Recherche" component={SearchNav} />
        <Tab.Screen name="Publier" component={NavAdd} />
        <Tab.Screen name="Messages" component={NavChat} />
        <Tab.Screen name="Profile" component={NavProfil} />
      </Tab.Navigator>
    </View>
  );
};

export default MenuNav;
