import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import GlobalColors from '../Styles/GlobalColors';

const NotFound = ({ message }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../Assets/communication.png')} style={{ width: 200, height: 200 }} />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    message: {
        color:GlobalColors.text,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});


export default NotFound;