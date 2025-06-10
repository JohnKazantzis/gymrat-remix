import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/workouts'
});

const getWorkoutsByUserId = (page, size, userId) => api.get('', {
    params: { 
        page: page, 
        size: size, 
        userId: userId 
    }
});

const addWorkout = (data) => api.post('', data);

export { getWorkoutsByUserId, addWorkout }