import axios from 'axios';

const API_URL = 'http://localhost:5000/api'

let currentToken = localStorage.getItem('token')
const instance = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': currentToken
    }
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
})

const authService = {
    login: async (email, password) => {
        try {
            const response = await instance.post(`${API_URL}/auth/signin`, { email, password })
            const { token } = response.data;
            localStorage.setItem('token', token)
            return response
        } catch (error) {
            throw new Error('Login Failed')
        }
    },
    logout: () => {
        localStorage.removeItem('token'); // Remove the token from local storage
    },
    signup: async (email, password, username) => {
        try {
            const response = await instance.post(`${API_URL}/auth/signup`, { username, email, password })
            return response.data
        }
        catch (error) {
            throw error
        }
    },
    verify: async (token) => {
        try {
            const response = await instance.post(`${API_URL}/auth/verify`, { token })
            return response.data
        } catch (error) {
            throw error
        }
    }
}

const userService = {
    getUserName: async () => {
        try {
            const response = await instance.get(`${API_URL}/user/getUsername`)
            console.log(response.data.username)
            return response.data.username
        } catch (error) {
            throw new error
        }
    },
    getHabits: async () => {
        try {
            const response = await instance.get(`${API_URL}/user/getHabits`)
            console.log(response.data.habits)
            return response.data.habits
        } catch (error) {
            throw error
        }
    }
}

const habitService = {
    addHabit: async (habit) => {
        try {
            const { name, description, frequency, completionStatus } = habit
            const response = await instance.put(`${API_URL}/habits/addHabit`, { name, description, frequency, completionStatus })
            console.log(response)
        } catch (err) {
            throw err
        }
    },
    updateHabit: async (oldHabitName, newHabit) => {
        try {
            const { name, description, frequency, completionStatus } = newHabit
            const response = await instance.put(`${API_URL}/habits/updateHabit`, { oldHabitName, name, description, frequency, completionStatus })
            console.log(response)
        } catch (err) {
            throw err
        }
    },

    deleteHabit: async (oldHabitName) => {
        try {
            const response = await instance.put(`${API_URL}/habits/updateHabit`, { oldHabitName })
            console.log(response)
        } catch (err) {
            throw err
        }
    }
}
export { authService, userService };