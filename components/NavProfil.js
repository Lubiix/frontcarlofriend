import React from 'react';

import ProfilScreen from '../screens/ProfilScreen';
import EditProfilScreen from '../screens/EditProfilScreen';

import { createStackNavigator } from '@react-navigation/stack';

const StackNavProfil = createStackNavigator()

const NavProfil = () => {
    return (
        <StackNavProfil.Navigator screenOptions={{ headerShown: false }}>
            <StackNavProfil.Screen name="profil" component={ProfilScreen}/>
            <StackNavProfil.Screen name="edit" component={EditProfilScreen}/>
        </StackNavProfil.Navigator>
    );
};

export default NavProfil;