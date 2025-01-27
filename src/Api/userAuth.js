import axiosInstance from "../Utils/axiosConfig";


const userAuth = {
    login: async (email, password) => {
        try {
            const response = await axiosInstance.post('/login', { email, password });
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data,
                    message: 'Login successful',
                };
            }
            else {
                return {
                    success: false,
                    data: null,
                    message: 'Login failed',
                };
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.message,
            };
        }
    },

    register: async (email, password) => {
        try {
            const response = await axios.post('http://localhost:9876/register', { email, password });
            return response.data;
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.message,
            }
        }
    },

    logout: async () => {
        try {
            const response = await axios.post('http://localhost:9876/logout');
            return response.data;
        } catch (error) {
           return{
                success: false,
                data: null,
                message: error.message,
        
           };
        }
    },
    profile: async () => {
        try {
            const response = await axiosInstance.get('/profile');
            // console.log("response from profile",response);
            
            return {
                success: true,
                data: response.data.user,
                message: 'Profile retrieved',
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.message,
            };
        }
    },
    getAllUsers: async () => {
        try {
            const response = await axiosInstance.get('/alluser');
            // console.log("response from all user",response.data);
            
            return {
                success: true,
                data: response.data.allTeachers,
                message: 'Users retrieved',
            };
        } catch (error) {
           return{
                success: false,
                data: null,
                message: error.message,
            };
           
        }
    },
    changePassword: async (oldPassword, newPassword) => {
        try {
            const response = await axiosInstance.post('/changepassword', { oldPassword, newPassword });
            return {
                success: true,
                data: response.data,
                message: 'Password changed',
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.message,
            };
        }
    },
};

export default userAuth;