import axios from 'axios';

export const baseURL = 'http://localhost:3030';

const api = axios.create({
    baseURL,
});

export const setHeadersToken = (token: string): void => {
    api.defaults.headers.common.authorization = token;
};

export default api;
