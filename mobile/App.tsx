import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Roboto_400Regular as robotoRegular,
  Roboto_500Medium as robotoMedium,
  Roboto_700Bold as robotoBold,
} from '@expo-google-fonts/roboto';
import { NavigationContainer } from '@react-navigation/native';

import theme from './src/styles/theme';
import Routes from './src/Routes';
import { UserContextProvider } from './src/context/UserContext';

export default function App() {
    const [fontsLoaded] = useFonts({
        robotoRegular,
        robotoMedium,
        robotoBold,
    });

    if (!fontsLoaded) return <AppLoading />;

    const styles = {
        dark: true,
        colors: {
          primary: 'rgb(255, 45, 85)',
          background: theme.colors.background,
          card: 'rgb(255, 255, 255)',
          text: theme.colors.text,
          border: 'rgb(199, 199, 204)',
          notification: 'rgb(255, 69, 58)',
        },
      };

  return (
    <NavigationContainer theme={styles} >
        <StatusBar style='light' backgroundColor="transparent" translucent />
        <UserContextProvider>
             <Routes />
        </UserContextProvider>
    </NavigationContainer>

  );
}
