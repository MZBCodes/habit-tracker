import axios from 'axios';

const API_URL = 'http://localhost:5000/api'

const instance = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

const authService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/signin`, { email, password })
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
            const response = await axios.post(`${API_URL}/auth/signup`, { username, email, password })
            return response.data
        }
        catch (error) {
            throw error
        }
    },
    verify: async (token) => {
        try {
            const response = await axios.post(`${API_URL}/auth/verify`, { token })
            return response.data
        } catch (error) {
            throw error
        }
    }
}

const userService = {
    getUserName: async () => {
        try {
            const response = await axios.get(`${API_URL}/user/getUsername`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log(response.data.username)
            return response.data.username
        } catch (error) {
            throw new Error('Login Failed')
        }
    },
    getHabits: async() => {
        try {
            const response = await axios.get(`${API_URL}/user/getHabits`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log(response.data.habits)
            return response.data.habits
        } catch (error) {
            throw new Error('Failed to retrieve Habits')
        }
    }
}

export {authService, userService};