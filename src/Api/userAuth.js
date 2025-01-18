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
            console.log(error);
            return error;
        }
    },

    logout: async () => {
        try {
            const response = await axios.post('http://localhost:9876/logout');
            return response.data;
        } catch (error) {
            console.log(error);
            return error;
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
            console.log(error);
            return error;
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
            console.log(error);
            return error;
        }
    },
};

export default userAuth;