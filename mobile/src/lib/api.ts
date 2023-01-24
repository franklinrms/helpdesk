import axios from 'axios';

export const baseURL = 'http://192.168.15.11:3030/'; // IP da maquina que está rodando o backend

const api = axios.create({
    baseURL,
});

export const setHeadersToken = (token: string): void => {
    api.defaults.headers.common.authorization = token;
};

export default api;
