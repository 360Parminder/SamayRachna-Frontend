import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import GlobalColors from "../Styles/GlobalColors";
import timeTable from "../Api/timeTable";
import { useNavigation } from "@react-navigation/native";

const CreateTimetable = () => {
    const navigation = useNavigation();
    // State to manage the number of teachers
    const [numTeachers, setNumTeachers] = useState(0);
    // State to manage teacher details, including subjects
    const [teachers, setTeachers] = useState([]);
    const [workingDays, setWorkingDays] = useState(0);
    const [lecturesPerDay, setLecturesPerDay] = useState(0);
    const [maxLecturesPerDayPerTeacher, setMaxLecturesPerDayPerTeacher] = useState(0);
    const [maxLecturesPerWeekPerTeacher, setMaxLecturesPerWeekPerTeacher] = useState(0);

    // Handle the change in number of teachers
    const handleNumTeachersChange = (text) => {
        const value = parseInt(text, 10);
        if (!isNaN(value) && value >= 0) {
            setNumTeachers(value);

            // Update the teachers array based on the new number of teachers
            const updatedTeachers = Array.from({ length: value }, () => ({
                teacherName: "",
                numSubjects: 0,
                subjects: [],
            }));
            setTeachers(updatedTeachers);
        }
    };

    // Handle change in teacher details
    const handleTeacherDetailChange = (index, field, value) => {
        const updatedTeachers = [...teachers];
        updatedTeachers[index][field] = value;
        setTeachers(updatedTeachers);
    };

    // Handle change in the number of subjects for a teacher
    const handleNumSubjectsChange = (index, value) => {
        const numSubjects = parseInt(value, 10);
        if (!isNaN(numSubjects) && numSubjects >= 0) {
            const updatedTeachers = [...teachers];
            updatedTeachers[index].numSubjects = numSubjects;

            // Create an array for subjects based on the number entered
            updatedTeachers[index].subjects = Array.from({ length: numSubjects }, () => "");
            setTeachers(updatedTeachers);
        }
    };

    // Handle change in subject name
    const handleSubjectNameChange = (teacherIndex, subjectIndex, value) => {
        const updatedTeachers = [...teachers];
        updatedTeachers[teacherIndex].subjects[subjectIndex] = value;
        setTeachers(updatedTeachers);
    };

    console.log(teachers, workingDays, lecturesPerDay, maxLecturesPerDayPerTeacher, maxLecturesPerWeekPerTeacher);
        const CreateTimetable = async()=>{
            const TimeTable = await timeTable.createTimetable(teachers, workingDays, lecturesPerDay, maxLecturesPerDayPerTeacher, maxLecturesPerWeekPerTeacher,numTeachers);
            console.log(TimeTable);
            navigation.navigate('TimeTable');
        }
           
    return (
        <View style={GlobalStyles.container}>
            <View>
                <Text>Create Timetable</Text>
            </View>
            <ScrollView style={{ width: '100%' }}>
                <View>
                    <Text style={GlobalStyles.label}>Working Days</Text>
                    <TextInput 
                        onChangeText={(text) => setWorkingDays(parseInt(text, 10) || 0)} 
                        style={GlobalStyles.inputText} 
                        keyboardType="numeric" 
                        placeholder="Enter number of working days" 
                    />
                </View>
                <View>
                    <Text style={GlobalStyles.label}>Number of Lectures</Text>
                    <TextInput 
                        onChangeText={(text) => setLecturesPerDay(parseInt(text, 10) || 0)} 
                        style={GlobalStyles.inputText} 
                        keyboardType="numeric" 
                        placeholder="Enter number of lectures" 
                    />
                </View>
                <View>
                    <Text style={GlobalStyles.label}>Number of Teachers</Text>
                    <TextInput
                        style={GlobalStyles.inputText}
                        keyboardType="numeric"
                        onChangeText={handleNumTeachersChange}
                        placeholder="Enter number of teachers"
                    />
                </View>
                <View>
                    <Text style={GlobalStyles.label}>Teacher Weekly Working Load</Text>
                    <TextInput 
                        onChangeText={(text) => setMaxLecturesPerWeekPerTeacher(parseInt(text, 10) || 0)} 
                        style={GlobalStyles.inputText} 
                        keyboardType="numeric" 
                        placeholder="Enter teacher weekly working load"
                    />
                </View>
                <View>
                    <Text style={GlobalStyles.label}>Teacher Daily Working Load</Text>
                    <TextInput 
                        onChangeText={(text) => setMaxLecturesPerDayPerTeacher(parseInt(text, 10) || 0)} 
                        style={GlobalStyles.inputText} 
                        keyboardType="numeric" 
                        placeholder="Enter teacher daily working load" 
                    />
                </View>

                {teachers.length > 0 && (
                    <>
                        <View style={{ alignItems: 'center', backgroundColor: '#71717a', marginVertical: 10, padding: 10, borderRadius: 8 }}>
                            <Text style={{ fontSize: 22, fontWeight: '700' }}>Teachers Details</Text>
                        </View>

                        {teachers.map((teacher, teacherIndex) => (
                            <View key={teacherIndex} style={{ backgroundColor: '#27272a', borderRadius: 10, padding: 10, marginBottom: 10 }}>
                                <Text style={{ marginBottom: 10, fontSize: 22, fontWeight: '600' }}>Teacher {teacherIndex + 1}</Text>
                                <Text style={GlobalStyles.label}>Name</Text>
                                <TextInput
                                    style={GlobalStyles.inputText}
                                    placeholder="Enter Name"
                                    value={teacher.teacherName}
                                    onChangeText={(text) => handleTeacherDetailChange(teacherIndex, "teacherName", text)}
                                />
                                <Text style={GlobalStyles.label}>Number of Subjects</Text>
                                <TextInput
                                    style={GlobalStyles.inputText}
                                    keyboardType="numeric"
                                    placeholder="Enter Number of Subjects"
                                    value={teacher.numSubjects.toString()}
                                    onChangeText={(text) => handleNumSubjectsChange(teacherIndex, text)}
                                />

                                {/* Display subject inputs based on the number of subjects entered */}
                                {teacher.subjects.map((subject, subjectIndex) => (
                                    <View key={subjectIndex}>
                                        <Text style={GlobalStyles.label}>Subject Name {subjectIndex + 1}</Text>
                                        <TextInput
                                            style={GlobalStyles.inputText}
                                            placeholder={`Enter Subject Name ${subjectIndex + 1}`}
                                            value={subject}
                                            onChangeText={(text) => handleSubjectNameChange(teacherIndex, subjectIndex, text)}
                                        />
                                    </View>
                                ))}
                            </View>
                        ))}
                    </>
                )}

                <View>
                    <Pressable onPress={()=>CreateTimetable()} style={{ backgroundColor: GlobalColors.primary, padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>Generate Timetable</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateTimetable;
