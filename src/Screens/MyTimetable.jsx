import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { UserDataContext } from '../Context/UserData';
import GlobalStyles from '../Styles/GlobalStyles';
import GlobalColors from '../Styles/GlobalColors';
import NotFound from '../Components/NotFound';
import timeTable from '../Api/timeTable';

const MyTimetable = () => {
    const { userData, profile } = useContext(UserDataContext);
    console.log(userData.mytimetable);
    

    useEffect(() => {
        profile();
    }, []);
    const handleDownload = async() => {
      const response = await timeTable.downloadTimeTable(userData.mytimetable);
      console.log(response);
        if(response.success){
            Alert.alert("Success", "Timetable downloaded successfully.");
        }else{
            Alert.alert("Error", "Failed to download timetable.");
        }
    };

    return (
        <View style={[GlobalStyles.container]}>
            {userData.mytimetable ? (
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ paddingBottom: 20 }}>
                    {userData.mytimetable.map((day, index) => (
                        <View key={index} style={styles.dayContainer}>
                            <Text style={styles.dayTitle}>Day {index + 1}</Text>
                            {day.map((lecture, idx) => (
                                <View key={idx} style={styles.lectureContainer}>
                                    <Text style={styles.lectureText}>Lecture: {lecture.lecture}</Text>
                                    <Text style={styles.lectureText}>Subject: {lecture.subject}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                    <TouchableOpacity style={GlobalStyles.primaryButton} onPress={handleDownload}>
                        <Text style={GlobalStyles.primaryButtonText}>Download</Text>
                    </TouchableOpacity>
                </ScrollView>
            ) : (
                <NotFound message="No timetable found" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dayContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: GlobalColors.primary,
        borderRadius: 8,
    },
    dayTitle: {
        color: GlobalColors.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    lectureContainer: {
        marginBottom: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: GlobalColors.secondary,
    },
    lectureText: {
        color: GlobalColors.text,
        fontSize: 18,
        fontWeight: '60',
    },
});

export default MyTimetable;