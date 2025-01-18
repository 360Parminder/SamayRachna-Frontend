import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Modal, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import timeTable from '../Api/timeTable';

const AllTimetables = () => {
    const [timetables, setTimetables] = useState([]);
    const [selectedTimetable, setSelectedTimetable] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await timeTable.allTimetables();
                if (response.success) {
                    setTimetables(response.data);
                } else {
                    Alert.alert("Error", "Failed to fetch timetables.");
                }
            } catch (error) {
                Alert.alert("Error", "An error occurred while fetching timetables.");
            }
        })();
    }, []);

    const publish = async (timetableId) => {
        try {
            const response = await timeTable.publishTimeTable(timetableId);
            if (response.success) {
                Alert.alert("Success", "Timetable published successfully.");
            } else {
                Alert.alert("Error", "Failed to publish timetable.");
            }
        } catch (error) {
            Alert.alert("Error", "An error occurred while publishing timetable.");
        }
    }

    const renderTimetable = ({ item }) => (
        <TouchableOpacity onPress={() => { setSelectedTimetable(item); setModalVisible(true); }}>
            <View style={styles.timetableItem}>
                <Text style={styles.timetableName}>{item.name}</Text>
                <Text style={styles.timetableDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderLecture = (lecture, index) => (
        <View key={index} style={styles.lectureItem}>
            <Text>Day: {lecture.day}</Text>
            <Text>Lecture: {lecture.lecture}</Text>
            <Text>Subject: {lecture.subject}</Text>
            <Text>Teacher: {lecture.teacher}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={timetables}
                renderItem={renderTimetable}
                keyExtractor={item => item.id}
            />
            {selectedTimetable && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <ScrollView style={styles.modalView}>
                        <Text style={styles.modalTitle}>{selectedTimetable.name}</Text>
                        {selectedTimetable.timetable.map((day, index) => (
                            <View key={index}>
                                {day.map(renderLecture)}
                            </View>
                        ))}
                        <Button title="Publish" onPress={() =>publish(selectedTimetable.id)} />
                        <Button title="Download" onPress={() => { /* Handle download */ }} />
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </ScrollView>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    timetableItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    timetableName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    timetableDate: {
        fontSize: 14,
        color: '#666',
    },
    modalView: {
        marginTop: 45,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    lectureItem: {
        marginBottom: 10,
    },
});

export default AllTimetables;