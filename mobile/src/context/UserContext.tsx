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
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRkZDcyZGE0LWMwNDEtNDJlNy1hNzI0LWQ4ZDM5YWNmZWU3MiIsIm5hbWUiOiJVU0VSIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2NzQ1OTYxNzZ9.GOFTnYzDMBJ0LwB_Lx_ozvHZXdAVj9TWPibuPJ0fyGw',
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
