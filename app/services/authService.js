import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
})

const login = (username, password) => api.post('/login', { username: username, password: password });
const signUp = user => api.post('/signup', user);

export { login, signUp }