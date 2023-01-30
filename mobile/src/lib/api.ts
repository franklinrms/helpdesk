import axios from 'axios';

const IP = '192.168.15.11'; // IP da maquina que está rodando o backend

export const baseURL = `http://${IP}:3030`;

const api = axios.create({
    baseURL,
});

export const setHeadersToken = (token: string): void => {
    api.defaults.headers.common.authorization = token;
};

export default api;
