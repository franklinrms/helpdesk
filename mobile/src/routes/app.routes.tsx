import { createStackNavigator } from '@react-navigation/stack';
import { Details } from '../screens/Details';
import { Home } from '../screens/Home';
import { NewRequest } from '../screens/NewRequest';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="NewRequest" component={NewRequest} />
        <Screen name="Details" component={Details} />
    </Navigator>
  )
}
