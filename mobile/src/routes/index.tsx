import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserContext from "../context/UserContext";
import { AppRoutes } from "./app.routes";
import { Login } from '../screens/Login';
import { useTheme } from 'native-base';

export function Routes() {
    const { token } = useContext(UserContext);
    const { colors } = useTheme();

    if (!token.length) {
        return <Login/>
    }

    const MyTheme = {
        dark: true,
        colors: {
          primary: colors.blue[500],
          background: colors.gray[700],
          card: colors.gray[600],
          text: colors.gray[200],
          border: colors.gray[500],
          notification: colors.blue[500],
        },
      };

    return (
        <NavigationContainer theme={MyTheme} >
            <AppRoutes/>
        </NavigationContainer>
    );
}
