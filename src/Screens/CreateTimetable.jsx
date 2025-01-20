import React, { useState, useEffect } from "react";
import { Pressable, ScrollView, Text, TextInput, View, Alert } from "react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import GlobalColors from "../Styles/GlobalColors";
import timeTable from "../Api/timeTable";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import userAuth from "../Api/userAuth";
import InputGroup from "../Components/InputGroup";

const CreateTimetable = () => {
    const navigation = useNavigation();
    const [numTeachers, setNumTeachers] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [workingDays, setWorkingDays] = useState("");
    const [lecturesPerDay, setLecturesPerDay] = useState("");
    const [maxLecturesPerDayPerTeacher, setMaxLecturesPerDayPerTeacher] = useState("");
    const [maxLecturesPerWeekPerTeacher, setMaxLecturesPerWeekPerTeacher] = useState("");
    const [timetableName, setTimetableName] = useState("");
    const [teacherList, setTeacherList] = useState([]);
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
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
                setLoading(false);
                setLecturesPerDay("");
                setMaxLecturesPerDayPerTeacher("");
                setMaxLecturesPerWeekPerTeacher("");
                setNumTeachers("");
                setTeachers([]);
                setTimetableName("");
                setWorkingDays("");
                navigation.navigate("TimeTable", { data: response.data });
            } else {
                setLoading(false);
                Alert.alert("Error", "Failed to create timetable.");
            }
        } catch (error) {
            Alert.alert("Error", "An error occurred while creating the timetable.");
        }
    };

    return (
        <View style={GlobalStyles.container}>
            <View style={{ width: "100%", alignItems: "center", marginBottom: 20 }}>
                <Text style={GlobalStyles.header}>Create Timetable</Text>
            </View>
            <ScrollView style={{ width: "100%" }}>
                <InputGroup
                    label="Timetable Name"
                    value={timetableName}
                    onChangeText={setTimetableName}
                />
                <InputGroup
                    label="Working Days"
                    value={workingDays.toString()}
                    onChangeText={(text) => setWorkingDays(parseInt(text, 10) || 0)}

                />
                <InputGroup
                    label="Lectures Per Day"
                    value={lecturesPerDay.toString()}
                    onChangeText={(text) => setLecturesPerDay(parseInt(text, 10) || 0)}

                />
                <InputGroup
                    label="Number of Teachers"
                    value={numTeachers.toString()}
                    onChangeText={(text) => setNumTeachers(parseInt(text, 10) || 0)}

                />
                <InputGroup
                    label="Teacher Weekly Working Load"
                    value={maxLecturesPerWeekPerTeacher.toString()}
                    onChangeText={(text) => setMaxLecturesPerWeekPerTeacher(parseInt(text, 10) || 0)}
                />

                <InputGroup
                    label="Teacher Daily Working Load"
                    value={maxLecturesPerDayPerTeacher.toString()}
                    onChangeText={(text) => setMaxLecturesPerDayPerTeacher(parseInt(text, 10) || 0)}
                />

                {numTeachers > 0 &&
                    Array.from({ length: numTeachers }).map((_, teacherIndex) => (
                        <View
                            key={teacherIndex}
                            style={{ backgroundColor: GlobalColors.primary, borderRadius: 10, padding: 10, marginBottom: 10 }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10, color: GlobalColors.text }}>
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
                                    style={[GlobalStyles.inputText]}
                                    value={subject}
                                    editable={false}
                                />
                            ))}
                        </View>
                    ))}

                <View>
                    <Pressable
                        onPress={createTimetable}
                        style={[GlobalStyles.primaryButton,{width:"100%"}]}
                    >
                        <Text style={GlobalStyles.primaryButtonText}>{loading?"Generating...":"Generate Timetable"}</Text>
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
        borderRadius: 10,
        backgroundColor: GlobalColors.background,
        color: GlobalColors.text,
        paddingRight: 30,
        marginBottom: 10,
    },
};
