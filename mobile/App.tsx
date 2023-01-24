import 'react-native-gesture-handler';

import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/theme';

import { UserContextProvider } from './src/context/UserContext';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';


export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

    return (
        <NativeBaseProvider theme={THEME}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            {fontsLoaded
                ? (
                    <UserContextProvider>
                        <Routes />
                    </UserContextProvider>
                )
                : <Loading />}
        </NativeBaseProvider>
    );
}
