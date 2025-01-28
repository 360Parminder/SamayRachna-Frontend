import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, StyleSheet, Alert, ScrollView, Pressable } from 'react-native';
import timeTable from '../Api/timeTable';
import GlobalStyles from '../Styles/GlobalStyles';
import GlobalColors from '../Styles/GlobalColors';
import NotFound from '../Components/NotFound';
import { FileDownloader } from '../Components/FileDownloader';

const AllTimetables = () => {
    const [timetables, setTimetables] = useState([]);
    const [selectedTimetable, setSelectedTimetable] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

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

    console.log("timetables", timetables);

    const publish = async (timetableId) => {
        setLoading(true);
        try {
            const response = await timeTable.publishTimeTable(timetableId);
            if (response.success) {
                const resp = await timeTable.allTimetables();
                if (resp.success) {
                    setTimetables(resp.data);
                } else {
                    Alert.alert("Error", "Failed to fetch timetables.");
                }
                setLoading(false);
                Alert.alert("Success", "Timetable published successfully.");
            } else {
                setLoading(false);
                Alert.alert("Error", "Failed to publish timetable.");
            }
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", "An error occurred while publishing timetable.");
        }
    };

    const handleDownload = async (timetableId, filename) => {
        const response = await timeTable.downloadTimeTable(timetableId);
        if (response.success) {
            try {
                const message = await FileDownloader(response.data, filename);
                Alert.alert("Success", message.message);
            } catch (error) {
                Alert.alert("Error", "Failed to start the download.");
            }
        } else {
            Alert.alert("Error", "Failed to download timetable.");
        }
    };

    const renderTimetable = ({ item }) => (
        <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => {
                setSelectedTimetable(item);
                setModalVisible(true);
            }}
        >
            <View style={styles.timetableItem}>
                {/* Status Indicator */}
                <View
                    style={{
                        backgroundColor: item.status ? '#095e1c' : '#82190c',
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                    }}
                />
                {/* Timetable Name */}
                <Text style={styles.timetableName}>{item.name}</Text>
                {/* Timetable Date */}
                <Text style={styles.timetableDate}>
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderLecture = (lecture, index) => (
        <View key={index} style={styles.lectureItem}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.lectureText}>Day: {lecture.day}</Text>
                <Text style={styles.lectureText}>Lecture: {lecture.lecture}</Text>
            </View>
            <Text style={styles.lectureText}>Subject: {lecture.subject}</Text>
            <Text style={styles.lectureText}>Teacher: {lecture.teacher}</Text>
        </View>
    );

    const groupLecturesByDay = (timetable) => {
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const groupedTimetable = Array.from({ length: 5 }, () => []);

        timetable.forEach((lecture) => {
            const dayIndex = lecture.day - 1; // Convert day (1-5) to array index (0-4)
            if (dayIndex >= 0 && dayIndex < 5) {
                groupedTimetable[dayIndex].push(lecture);
            }
        });

        return groupedTimetable;
    };

    return (
        <View style={GlobalStyles.container}>
            {timetables.length > 0 ? (
                <FlatList
                    data={timetables}
                    renderItem={renderTimetable}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <NotFound message="No Timetables Found" />
            )}

            {selectedTimetable && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <ScrollView style={styles.modalView} contentContainerStyle={{ paddingBottom: 60 }}>
                        <Text style={styles.modalTitle}>{selectedTimetable.name}</Text>
                        {groupLecturesByDay(selectedTimetable.timetable).map((daySchedule, dayIndex) => (
                            <View key={dayIndex}>
                                <Text style={styles.dayTitle}>{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][dayIndex]}</Text>
                                {daySchedule.map((lecture, lectureIndex) => renderLecture(lecture, lectureIndex))}
                            </View>
                        ))}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Pressable
                                style={[GlobalStyles.primaryButton, { width: '40%' }]}
                                onPress={() => publish(selectedTimetable.id)}
                            >
                                <Text style={GlobalStyles.primaryButtonText}>{loading ? "Publishing..." : "Publish"}</Text>
                            </Pressable>
                            <Pressable
                                style={[GlobalStyles.primaryButton, { width: '40%' }]}
                                onPress={() => handleDownload(selectedTimetable.id, selectedTimetable.name)}
                            >
                                <Text style={GlobalStyles.primaryButtonText}>Download</Text>
                            </Pressable>
                        </View>
                        <Pressable
                            style={[GlobalStyles.secondaryButton, { width: '100%' }]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={GlobalStyles.secondaryButtonText}>Close</Text>
                        </Pressable>
                    </ScrollView>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    timetableItem: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: GlobalColors.primary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    timetableName: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalColors.text,
        textTransform: 'capitalize',
    },
    timetableDate: {
        fontSize: 14,
        color: '#666',
    },
    modalView: {
        marginTop: 45,
        padding: 20,
        backgroundColor: GlobalColors.primary,
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
        color: GlobalColors.text,
    },
    dayTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: GlobalColors.text,
        marginBottom: 8,
    },
    lectureItem: {
        backgroundColor: GlobalColors.secondary,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        gap: 6,
    },
    lectureText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalColors.text,
    },
});

export default AllTimetables;