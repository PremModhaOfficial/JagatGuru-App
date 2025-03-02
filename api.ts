import axios from 'axios';

import { ACCESS_TOKEN } from './constants';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getHabits = async () => {
    try {
        const response = await api.get('/habits/');
        return response.data;
    } catch (error) {
        console.error('Error fetching habits:', error);
        throw error;
    }
};

export default api;
