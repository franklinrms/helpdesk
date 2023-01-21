import axios from 'axios';

export const baseURL =
    process.env.REACT_APP_BASE_URL ?? 'http://localhost:3030';

const api = axios.create({
    baseURL,
});

export const setToken = (token: string): void => {
    api.defaults.headers.common.authorization = token;
};

export default api;
