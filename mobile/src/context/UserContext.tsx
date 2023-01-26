import React, { useMemo, useState, createContext, useEffect, Dispatch, SetStateAction } from 'react';
import api, { setHeadersToken } from '../lib/api';

export interface UserType {
    userId: string;
    name: string;
    role: string;
}

interface PropsUserContext {
    user: UserType;
    userAuth: () => void;
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
}

const DEFAULT_VALUE = {
    user: {
        userId: '',
        name: '',
        role: '',
    },
    userAuth: () => {},
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjNTUxNjk5LTk3OGMtNGY2YS1hZDFhLTc3NWE4MTc2NzM1YyIsIm5hbWUiOiJVU0VSIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2NzQ3NDU4Nzh9.hkhCXb2x-zG3Otuh2BwFgCXgn5MqbO0JhCJTrme84cc',
    setToken: () => {},
};

const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE);

interface UserProviderProps {
    children: React.ReactNode;
}
function UserContextProvider({ children }: UserProviderProps): JSX.Element {
    const [user, setUser] = useState(DEFAULT_VALUE.user);
    const [token, setToken] = useState(DEFAULT_VALUE.token);

    const userAuth = async (): Promise<void> => {
        setHeadersToken(token);
        try {
            const { data } = await api.get('/validate');
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        userAuth()
    }, [token]);

    const contextValue = useMemo(
        () => ({
            user,
            userAuth,
            token,
            setToken,
        }),
        [user, token]
    );

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContextProvider };
export default UserContext;
