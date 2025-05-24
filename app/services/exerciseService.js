import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/exercises'
});

const getExercisesByMuscleGroup = () => api.get();

export { getExercisesByMuscleGroup }