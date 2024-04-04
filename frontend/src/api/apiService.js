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
            const response = await axios.post(`${API_URL}/auth/signin`,  {email, password})
            const { token } = response.data;
            localStorage.setItem('token', token)
            return token;
        } catch (error) {
            throw new Error('Login Failed')
        }
    },
    logout: () => {
        localStorage.removeItem('token'); // Remove the token from local storage
    },
    signup: async (email, password, username) => {
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, {username, email, password })
            return response.data
        }
        catch (error) {
            throw error
        }
    }
}

export default authService;