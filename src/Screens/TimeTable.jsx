import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TimetableScreen = ({ data }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Timetable</Text>
      {data.timetable.map((daySchedule, dayIndex) => (
        <View key={dayIndex} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{daysOfWeek[dayIndex]}</Text>
          {daySchedule.map((lecture, lectureIndex) => (
            <View key={lectureIndex} style={styles.lectureCard}>
              <Text style={styles.lectureText}>
                Lecture {lecture.lecture}: {lecture.subject}
              </Text>
              <Text style={styles.teacherText}>Teacher: {lecture.teacher}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f0ff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6600ff',
    textAlign: 'center',
    marginBottom: 16,
  },
  dayContainer: {
    marginBottom: 24,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2a0077',
    marginBottom: 8,
  },
  lectureCard: {
    backgroundColor: '#9c73ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  lectureText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  teacherText: {
    fontSize: 14,
    color: '#f3f0ff',
  },
});

export default TimetableScreen;
