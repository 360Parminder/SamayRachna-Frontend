import axiosInstance from "../Utils/axiosConfig";

const timeTable = {
    createTimetable: async (workingDays, lecturesPerDay, maxLecturesPerDayPerTeacher, maxLecturesPerWeekPerTeacher, teachers, timetableName, numTeachers) => {
        //    console.log("workingDays",workingDays);

        try {
            const response = await axiosInstance.post('/timetable',
                {
                    workingDays: workingDays,
                    lecturesPerDay: lecturesPerDay,
                    totalTeachers: numTeachers,
                    maxLecturesPerDayPerTeacher: maxLecturesPerDayPerTeacher,
                    maxLecturesPerWeekPerTeacher: maxLecturesPerWeekPerTeacher,
                    teachers: teachers,
                    timetableName: timetableName,
                    timetableId: null

                }
            );
            return {
                status: response.status,
                data: response.data,
                success: true
            };

        } catch (error) {
            return {
                status: error.response.status,
                data: error.response.data,
                success: false
            };

        }
    },
    allTimetables: async () => {
        try {
            const response = await axiosInstance.get('/gettimetables');
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.timetables,
                    message: 'timetable fetched',
                };
            }
            else {
                return {
                    success: false,
                    data: null,
                    message: 'timetable failed',
                };
            }
        } catch (error) {
            return {
                status: error.response.status,
                data: error.response.data,
                success: false,
                message: error.message,
            };
        }
    },
    publishTimeTable: async (timetableId) => {
        try {
            const response = await axiosInstance.post('publishtimetable', { id: timetableId });
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data,
                    message: 'timetable published',
                };
            }
            else {
                return {
                    success: false,
                    data: null,
                    message: 'timetable failed',
                };
            }
        } catch (error) {
            return {
                status: error.response.status,
                data: error.response.data,
                success: false,
                message: error.message,
            };
        }
    },
    downloadTimeTable: async (timetableId) => {
        // console.log("timetableId", timetableId);
        
        try {
            const response = await axiosInstance.get('downloadtimetable', {
                params: {
                    id: timetableId
                }
            });
            console.log(response.data);
            
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.downloadUrl,
                    message: 'timetable downloaded',
                };
            }
            else {
                return {
                    success: false,
                    data: null,
                    message: 'timetable failed',
                };
            }
        } catch (error) {
            return {
                status: error.response.status,
                data: error.response.data,
                success: false,
                message: error.message,
            };
        }
    },

}
export default timeTable