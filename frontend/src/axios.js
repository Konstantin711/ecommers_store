// src/axios.js
import axios from 'axios';

const customAxios = axios.create({
    baseURL: 'http://localhost:8000', // Ваш базовий URL
});

customAxios.interceptors.request.use(
    config => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo ? userInfo.access : null; // Отримуємо токен доступу
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

customAxios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            window.location.href = '/admin/login'; 
            localStorage.removeItem('userInfo');
        }
        return Promise.reject(error);
    }
);

export default customAxios;
