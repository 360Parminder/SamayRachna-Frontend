
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/Navigation/AuthStack';
import { AuthProvider } from './src/Context/Auth';
import { UserDataProvider } from './src/Context/UserData';


export default function App() {
   

    return (
        <NavigationContainer>
            <AuthProvider>
                <UserDataProvider>
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

