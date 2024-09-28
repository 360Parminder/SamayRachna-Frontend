import axios from "axios";

const timeTable = {
    createTimetable: async( teachers, workingDays, lecturesPerDay, maxLecturesPerDayPerTeacher, maxLecturesPerWeekPerTeacher,numTeachers) => {
        try {
            const response = await axios.post('http://localhost:9876/timetable',
                {
                    workingDays: workingDays,
                    lecturesPerDay: lecturesPerDay,
                    totalTeachers: numTeachers,
                    maxLecturesPerDayPerTeacher: maxLecturesPerDayPerTeacher,
                    maxLecturesPerWeekPerTeacher: maxLecturesPerWeekPerTeacher,
                    teachers: teachers
                }
                 );
                //  console.log(response.data.timetable[0]);
            return response.data;
            
        } catch (error) {
            console.log(error);
            return error;
            
        }
    },
           
}
export default timeTable