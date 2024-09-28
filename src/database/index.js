import axios from 'axios';

const configAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 5000,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

export const get = async (url, option = {}) => {
    try {
        return await configAxios.get(url, option);
    } catch (error) {
        return error;
    }
};
export const post = async (url, body, option = {}) => {
    try {
        return await configAxios.post(url, body, option);
    } catch (error) {
        return error;
    }
};
