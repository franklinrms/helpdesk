/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, useState, createContext } from 'react';
import api, { setToken } from '../lib/api';

export interface UserType {
    userId: string;
    name: string;
    role: string;
}

interface PropsUserContext {
    user: UserType;
    userAuth: () => void;
}

const DEFAULT_VALUE = {
    user: {
        userId: '',
        name: '',
        role: '',
    },
    userAuth: () => {},
};

const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE);

interface UserProviderProps {
    children: React.ReactNode;
}
function UserContextProvider({ children }: UserProviderProps): JSX.Element {
    const [user, setUser] = useState(DEFAULT_VALUE.user);

    const getToken = (): void => {
        const token = sessionStorage.getItem(
            '94c8aa2452bccd82ee129b46f7c4be79'
        );
        if (token !== null) setToken(JSON.parse(token));
    };

    const userAuth = async (): Promise<void> => {
        getToken();

        try {
            const { data } = await api.get('/validate');
            setUser(data);
        } catch (error) {
            window.location.href = '/';
        }
    };

    const contextValue = useMemo(
        () => ({
            user,
            userAuth,
        }),
        [user]
    );

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContextProvider };
export default UserContext;
