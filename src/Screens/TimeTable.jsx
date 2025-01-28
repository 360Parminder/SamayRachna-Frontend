import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import GlobalStyles from '../Styles/GlobalStyles';
import GlobalColors from '../Styles/GlobalColors';
import NotFound from '../Components/NotFound';

const LectureCard = ({ lecture }) => (
  <View style={styles.lectureCard}>
    <Text style={styles.lectureText}>
      Lecture {lecture.lecture}: {lecture.subject}
    </Text>
    <Text style={styles.teacherText}>Teacher: {lecture.teacher}</Text>
  </View>
);

const TimetableScreen = ({ route }) => {
  const data = route.params?.data;
  console.log("data", data);

  if (!data || !data.timetable || !Array.isArray(data.timetable.timetable)) {
    return <NotFound text="Timetable not found" />;
  }

  // Group lectures by day
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const groupedTimetable = Array.from({ length: 5 }, () => []); // Initialize an array for each day

  data.timetable.timetable.forEach(lecture => {
    const dayIndex = lecture.day - 1; // Convert day (1-5) to array index (0-4)
    if (dayIndex >= 0 && dayIndex < 5) {
      groupedTimetable[dayIndex].push(lecture);
    }
  });

  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={[GlobalStyles.container, { width: "100%" }]}>
        <Text style={GlobalStyles.header}>Timetable</Text>
        {groupedTimetable.map((daySchedule, dayIndex) => (
          <View key={dayIndex} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{daysOfWeek[dayIndex]}</Text>
            {daySchedule.map((lecture, lectureIndex) => (
              <LectureCard key={`${dayIndex}-${lectureIndex}`} lecture={lecture} />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    width: "100%",
    marginBottom: 24,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalColors.text,
    marginBottom: 8,
  },
  lectureCard: {
    backgroundColor: GlobalColors.primary,
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  lectureText: {
    fontSize: 16,
    fontWeight: '500',
    color: GlobalColors.text,
  },
  teacherText: {
    fontSize: 14,
    color: GlobalColors.text,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TimetableScreen;