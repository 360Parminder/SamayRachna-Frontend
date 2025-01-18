import React, { useState, useEffect } from "react";
import { Pressable, ScrollView, Text, TextInput, View, Alert } from "react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import GlobalColors from "../Styles/GlobalColors";
import timeTable from "../Api/timeTable";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import userAuth from "../Api/userAuth";

const CreateTimetable = () => {
    const navigation = useNavigation();
    const [numTeachers, setNumTeachers] = useState(0);
    const [teachers, setTeachers] = useState([]);
    const [workingDays, setWorkingDays] = useState(0);
    const [lecturesPerDay, setLecturesPerDay] = useState(0);
    const [maxLecturesPerDayPerTeacher, setMaxLecturesPerDayPerTeacher] = useState(0);
    const [maxLecturesPerWeekPerTeacher, setMaxLecturesPerWeekPerTeacher] = useState(0);
    const [timetableName, setTimetableName] = useState("");
    const [teacherList, setTeacherList] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await userAuth.getAllUsers();
                if (response.success) {
                    setTeacherList(response.data);
                } else {
                    Alert.alert("Error", "Failed to fetch teachers.");
                }
            } catch (error) {
                console.error("Error fetching teachers:", error);
                Alert.alert("Error", "An error occurred while fetching teachers.");
            }
        };
        fetchTeachers();
    }, []);

    useEffect(() => {
        const updatedTeachers = Array.from({ length: numTeachers }, (_, i) => teachers[i] || {});
        setTeachers(updatedTeachers);
    }, [numTeachers]);

    const handleTeacherDetailChange = (index, field, value) => {
        const updatedTeachers = [...teachers];

        if (!updatedTeachers[index]) updatedTeachers[index] = {};

        if (field === "userid") {
            const selectedTeacher = teacherList.find((t) => t.userid === value);
            updatedTeachers[index].userid = value;
            updatedTeachers[index].teacherName = selectedTeacher?.name || "";
            updatedTeachers[index].subjects = selectedTeacher?.mySubjects || [];
        }

        setTeachers(updatedTeachers);
    };

    const createTimetable = async () => {
        if (!timetableName || workingDays <= 0 || lecturesPerDay <= 0 || numTeachers <= 0) {
            Alert.alert("Validation Error", "Please fill all required fields correctly.");
            return;
        }

        try {
            const response = await timeTable.createTimetable(
                workingDays,
                lecturesPerDay,
                maxLecturesPerDayPerTeacher,
                maxLecturesPerWeekPerTeacher,
                teachers,
                timetableName,
                numTeachers,
            );
            if (response.success) {
                navigation.navigate("TimeTable", { data: response.data });
            } else {
                Alert.alert("Error", "Failed to create timetable.");
            }
        } catch (error) {
            console.error("Error creating timetable:", error);
            Alert.alert("Error", "An error occurred while creating the timetable.");
        }
    };

    return (
        <View style={GlobalStyles.container}>
            <View>
                <Text style={GlobalStyles.header}>Create Timetable</Text>
            </View>
            <ScrollView style={{ width: "100%" }}>
                <View>
                    <Text style={GlobalStyles.label}>Timetable Name</Text>
                    <TextInput
                    placeholderTextColor={GlobalColors.text}
                        value={timetableName}
                        onChangeText={setTimetableName}
                        style={GlobalStyles.inputText}
                        placeholder="Enter timetable name"
                    />
                </View>
                <View>
                    <Text style={GlobalStyles.label}>Working Days</Text>
                    <TextInput
                        value={workingDays.toString()}
                        onChangeText={(text) => setWorkingDays(parseInt(text, 10) || 0)}
                        style={GlobalStyles.inputText}
                        keyboardType="numeric"
                        placeholder="Enter number of working days"
                    />
                </View>
                <View>
                    <Text style={GlobalStyles.label}>Lectures Per Day</Text>
                    <TextInput
                        value={lecturesPerDay.toString()}
                        onChangeText={(text) => setLecturesPerDay(parseInt(text, 10) || 0)}
                        style={GlobalStyles.inputText}
                        keyboardType="numeric"
                        placeholder="Enter number of lectures per day"
                    />
                </View>
                <View>
                    <Text style={GlobalStyles.label}>Number of Teachers</Text>
                    <TextInput
                        value={numTeachers.toString()}
                        onChangeText={(text) => setNumTeachers(parseInt(text, 10) || 0)}
                        style={GlobalStyles.inputText}
                        keyboardType="numeric"
                        placeholder="Enter number of teachers"
                    />
                </View>
                <View>
                    <Text style={GlobalStyles.label}>Teacher Weekly Working Load</Text>
                    <TextInput
                        value={maxLecturesPerWeekPerTeacher.toString()}
                        onChangeText={(text) => setMaxLecturesPerWeekPerTeacher(parseInt(text, 10) || 0)}
                        style={GlobalStyles.inputText}
                        keyboardType="numeric"
                        placeholder="Enter max weekly lectures per teacher"
                    />
                </View>
                <View>
                    <Text style={GlobalStyles.label}>Teacher Daily Working Load</Text>
                    <TextInput
                        value={maxLecturesPerDayPerTeacher.toString()}
                        onChangeText={(text) => setMaxLecturesPerDayPerTeacher(parseInt(text, 10) || 0)}
                        style={GlobalStyles.inputText}
                        keyboardType="numeric"
                        placeholder="Enter max daily lectures per teacher"
                    />
                </View>

                {numTeachers > 0 &&
                    Array.from({ length: numTeachers }).map((_, teacherIndex) => (
                        <View
                            key={teacherIndex}
                            style={{ backgroundColor: "#27272a", borderRadius: 10, padding: 10, marginBottom: 10 }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
                                Teacher {teacherIndex + 1}
                            </Text>
                            <Text style={GlobalStyles.label}>Name</Text>
                            <RNPickerSelect
                                style={pickerSelectStyles}
                                placeholder={{ label: "Select Teacher", value: null }}
                                onValueChange={(value) =>
                                    handleTeacherDetailChange(teacherIndex, "userid", value)
                                }
                                value={teachers[teacherIndex]?.userid || null}
                                items={teacherList.map((teacher) => ({
                                    label: teacher.name,
                                    value: teacher.userid,
                                }))}
                            />
                            <Text style={GlobalStyles.label}>Subjects</Text>
                            {teachers[teacherIndex]?.subjects?.map((subject, subjectIndex) => (
                                <TextInput
                                    key={subjectIndex}
                                    style={{
                                        ...GlobalStyles.inputText,
                                        color: GlobalColors.primary, // Blue color for subjects
                                    }}
                                    value={subject}
                                    editable={false}
                                />
                            ))}
                        </View>
                    ))}

                <View>
                    <Pressable
                        onPress={createTimetable}
                        style={{
                            backgroundColor: GlobalColors.primary,
                            padding: 10,
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>Generate Timetable</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateTimetable;

const pickerSelectStyles = {
    inputIOS: {
        width: "100%",
        borderRadius: 5,
        borderColor: GlobalColors.borderColor,
        borderWidth: 1,
        height: 50,
        fontSize: 16,
        paddingLeft: 10,
        backgroundColor: "white",
        color: "#000",
        marginBottom: 15,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: GlobalColors.borderColor,
        borderRadius: 4,
        color: "#000",
        backgroundColor: "#fff",
        paddingRight: 30,
        marginBottom: 10,
    },
};
