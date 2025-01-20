
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/Navigation/AuthStack';
import { AuthProvider } from './src/Context/Auth';
import { UserDataProvider } from './src/Context/UserData';
import GlobalColors from './src/Styles/GlobalColors';


export default function App() {
   

    return (
        <NavigationContainer>
            <AuthProvider>
                <UserDataProvider>
                    <StatusBar barStyle="light-content" backgroundColor={GlobalColors.background}  />
                    <AuthStack />
                </UserDataProvider>
            </AuthProvider>
        </NavigationContainer>

        // <Login/>
        // <HomeScreen/>
        // <CreateTimetable/>
    );
}

const styles = StyleSheet.create({

});

