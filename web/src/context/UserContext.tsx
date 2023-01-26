/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
    useMemo,
    useState,
    createContext,
    Dispatch,
    SetStateAction,
} from 'react';
import api, { setToken } from '../lib/api';

export interface UserType {
    userId: string;
    name: string;
    role: string;
}

interface PropsUserContext {
    user: UserType;
    userAuth: () => void;
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DEFAULT_VALUE = {
    user: {
        userId: '',
        name: '',
        role: '',
    },
    userAuth: () => {},
    modalIsOpen: false,
    setModalIsOpen: () => {},
};

const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE);

interface UserProviderProps {
    children: React.ReactNode;
}
function UserContextProvider({ children }: UserProviderProps): JSX.Element {
    const [user, setUser] = useState(DEFAULT_VALUE.user);
    const [modalIsOpen, setModalIsOpen] = useState(DEFAULT_VALUE.modalIsOpen);

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
            modalIsOpen,
            setModalIsOpen,
        }),
        [user, modalIsOpen]
    );

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContextProvider };
export default UserContext;
