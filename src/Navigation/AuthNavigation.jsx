
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../Screens/Login';
import AppNavigation from './AppNavigation';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
       <Stack.Navigator initialRouteName="Login">
           <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
           <Stack.Screen name="root" component={AppNavigation} options={{ headerShown: false }}/>
       </Stack.Navigator>
    );
};

export default AuthNavigation;