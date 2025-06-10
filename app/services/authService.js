import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/auth'
})

const login = (username, password) => api.post('/login', { username: username, password: password });
const signUp = (username, email, password) => api.post('/signup', { username, email, password });

export { login, signUp }