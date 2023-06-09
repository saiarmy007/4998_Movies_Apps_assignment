import { NavigationContainer } from '@react-navigation/native';
import AppTabs from './Tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/moreDetailsScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={AppTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default AppStack