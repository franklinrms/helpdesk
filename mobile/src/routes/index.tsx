import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserContext from "../context/UserContext";
import { AppRoutes } from "./app.routes";
import { Login } from '../screens/Login';

export function Routes() {
    const { token } = useContext(UserContext);

    if (!token.length) {
        return <Login/>
    }

    return (
        <NavigationContainer>
            <AppRoutes/>
        </NavigationContainer>
    );
}
