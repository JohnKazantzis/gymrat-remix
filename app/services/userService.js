import axios from 'axios';

// Create API
const api = axios.create({
    baseURL: 'http://localhost:3001/api/users'
});

const getAllUsers = () => api.get();
const getUserData = (id) => api.get(`/${id}`);
const updateUser = (user) => api.put(`/${user.id}`, user);

export { getUserData, updateUser, getAllUsers }