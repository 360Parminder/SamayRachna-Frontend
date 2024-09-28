
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/Navigation/AuthStack';


export default function App() {
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
    <NavigationContainer>
            <AuthStack/>
    </NavigationContainer>
     
    // <Login/>
    // <HomeScreen/>
    // <CreateTimetable/>
  );
}

const styles = StyleSheet.create({
  
}); 

