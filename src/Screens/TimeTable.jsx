import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TimetableScreen = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const data = {
    "success": true,
    "message": "Timetable generated successfully",
    "timetable": [
        [
            {
                "day": 1,
                "lecture": 1,
                "teacher": "Mr. Sharma",
                "subject": "Mathematics"
            },
            {
                "day": 1,
                "lecture": 2,
                "teacher": "Mr. Gupta",
                "subject": "English"
            },
            {
                "day": 1,
                "lecture": 3,
                "teacher": "Ms. Singh",
                "subject": "Biology"
            },
            {
                "day": 1,
                "lecture": 4,
                "teacher": "Ms. pandat",
                "subject": "C++"
            },
            {
                "day": 1,
                "lecture": 5,
                "teacher": "Ms. yadav",
                "subject": "Computer"
            },
            {
                "day": 1,
                "lecture": 6,
                "teacher": "Ms. Singh",
                "subject": "Chemistry"
            }
        ],
        [
            {
                "day": 2,
                "lecture": 1,
                "teacher": "Ms. Singh",
                "subject": "Biology"
            },
            {
                "day": 2,
                "lecture": 2,
                "teacher": "Ms. pandat",
                "subject": "C++"
            },
            {
                "day": 2,
                "lecture": 3,
                "teacher": "Ms. pandat",
                "subject": "C++"
            },
            {
                "day": 2,
                "lecture": 4,
                "teacher": "Ms. yadav",
                "subject": "Computer"
            },
            {
                "day": 2,
                "lecture": 5,
                "teacher": "Mr. Sharma",
                "subject": "Physics"
            },
            {
                "day": 2,
                "lecture": 6,
                "teacher": "Mr. Khan",
                "subject": "Political Science"
            }
        ],
        [
            {
                "day": 3,
                "lecture": 1,
                "teacher": "Ms. Roy",
                "subject": "Business Studies"
            },
            {
                "day": 3,
                "lecture": 2,
                "teacher": "Ms. yadav",
                "subject": "Computer"
            },
            {
                "day": 3,
                "lecture": 3,
                "teacher": "Ms. Patel",
                "subject": "Physics"
            },
            {
                "day": 3,
                "lecture": 4,
                "teacher": "Ms. yadav",
                "subject": "Computer"
            },
            {
                "day": 3,
                "lecture": 5,
                "teacher": "Ms. pandat",
                "subject": "C++"
            },
            {
                "day": 3,
                "lecture": 6,
                "teacher": "Ms. Patel",
                "subject": "Chemistry"
            }
        ],
        [
            {
                "day": 4,
                "lecture": 1,
                "teacher": "Mr. Sharma",
                "subject": "Physics"
            },
            {
                "day": 4,
                "lecture": 2,
                "teacher": "Mr. Khan",
                "subject": "Political Science"
            },
            {
                "day": 4,
                "lecture": 3,
                "teacher": "Ms. pandat",
                "subject": "C++"
            },
            {
                "day": 4,
                "lecture": 4,
                "teacher": "Ms. Verma",
                "subject": "History"
            },
            {
                "day": 4,
                "lecture": 5,
                "teacher": "Ms. Patel",
                "subject": "Physics"
            },
            {
                "day": 4,
                "lecture": 6,
                "teacher": "Ms. pandat",
                "subject": "C++"
            }
        ],
        [
            {
                "day": 5,
                "lecture": 1,
                "teacher": "Ms. Singh",
                "subject": "Chemistry"
            },
            {
                "day": 5,
                "lecture": 2,
                "teacher": "Mr. Khan",
                "subject": "Political Science"
            },
            {
                "day": 5,
                "lecture": 3,
                "teacher": "Ms. Patel",
                "subject": "Physics"
            },
            {
                "day": 5,
                "lecture": 4,
                "teacher": "Mr. Gupta",
                "subject": "English"
            },
            {
                "day": 5,
                "lecture": 5,
                "teacher": "Ms. Verma",
                "subject": "Geography"
            },
            {
                "day": 5,
                "lecture": 6,
                "teacher": "Mr. Gupta",
                "subject": "English"
            }
        ]
    ]
}
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
