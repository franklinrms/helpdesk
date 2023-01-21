import React, { useMemo, useState, createContext } from 'react';

interface UserType {
    userId: string;
    name: string;
    role: string;
}

interface PropsUserContext {
    user: UserType;
}

const DEFAULT_VALUE = {
    user: {
        userId: '100cd77f-a837-4247-a1e3-1f90ff6e7440',
        name: '',
        role: '',
    },
};

const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE);

interface UserProviderProps {
    children: React.ReactNode;
}
function UserContextProvider({ children }: UserProviderProps): JSX.Element {
    const [user, setUser] = useState(DEFAULT_VALUE.user);

    const contextValue = useMemo(
        () => ({
            user,
            setUser,
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
