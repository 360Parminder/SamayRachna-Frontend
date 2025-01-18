import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { UserDataContext } from '../Context/UserData';

const MyTimetable = () => {
    const {userData} = useContext(UserDataContext);

    
    const handleDownload = () => {
        // Handle download logic here
        console.log('Download button pressed');
    };

    return (
        <ScrollView style={styles.container}>
            {userData.mytimetable.map((day, index) => (
                <View key={index} style={styles.dayContainer}>
                    <Text style={styles.dayTitle}>Day {index + 1}</Text>
                    {day.map((lecture, idx) => (
                        <View key={idx} style={styles.lectureContainer}>
                            <Text>Lecture: {lecture.lecture}</Text>
                            <Text>Subject: {lecture.subject}</Text>
                        </View>
                    ))}
                </View>
            ))}
            <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                <Text style={styles.downloadButtonText}>Download</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    dayContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    lectureContainer: {
        marginBottom: 8,
    },
    downloadButton: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
    },
    downloadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyTimetable;