import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="home" component={Home} />
    </Navigator>
  )
}
