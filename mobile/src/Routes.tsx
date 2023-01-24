import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './screens/Login';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
