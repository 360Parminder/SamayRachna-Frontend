

const userAuth = {
    login: async (email, password) => {
        try {
            const response = await axios.post('http://localhost:9876/login', { email, password });
            return response.data;
        } catch (error) {
            console.log(error);
            return error;
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
};

export default userAuth;