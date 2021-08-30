import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Button} from 'react-native'
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

const MenuNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#009788",
          tabBarinactiveTintColor: "#FFFFFF",
          tabBarActiveBackgroundColor: "#111224",
          tabBarInactiveBackgroundColor: "#111224",
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === "gallery") {
              iconName = "images";
            } else if (route.name === "snap") {
              iconName = "camera";
            }

            return <Ionicons name={iconName} size={30} color={color} />;
          },
        })}
      >
        <Tab.Screen name="gallery" component={HomeScreen} />
        
      </Tab.Navigator>
    </View>
  );
};

export default MenuNav;
