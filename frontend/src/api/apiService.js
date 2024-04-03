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
            const resposne = await axios.post(`${API_URL}/auth/signin`,  {email, password})
            const { token } = respose.data;
            localStorage.setItem('token', token)
            return token;
        } catch (error) {
            throw new Error('Login Failed')
        }
    },
    logout: () => {
        localStorage.removeItem('token'); // Remove the token from local storage
    }
}

export default {instance, authService};