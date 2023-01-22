import api, { setToken } from '../lib/api';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const getToken = (): void => {
    const token = sessionStorage.getItem('94c8aa2452bccd82ee129b46f7c4be79');
    if (token !== null) setToken(JSON.parse(token));
};
const getUser = async (): Promise<void> => {
    const { setUser } = useContext(UserContext);
    getToken();
    try {
        const { data } = await api.get('/validate');
        setUser(data);
    } catch (error) {
        window.location.href = '/';
    }
};
const useAuth = async (): Promise<void> => {
    await getUser();
};

export default useAuth;
