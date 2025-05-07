import axios from "axios";

// Create API
const api = axios.create({
    baseURL: "http://localhost:8080/api/users"
});

// Add a request interceptor
// api.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('accessToken');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
// );

const getAllUsers = () => api.get();
const getUserData = (id) => api.get(`/${id}`);
const updateUser = (user) => api.put(`/${user.id}`, user);

export { getUserData, updateUser, getAllUsers }