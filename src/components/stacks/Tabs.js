import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import TVShowScreen from '../screens/TVShows';
import MovieScreen from '../screens/Movies';
import SearchScreen from '../screens/Search';

const Tab = createMaterialTopTabNavigator();

const AppTabs = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator>
                <Tab.Screen name="Movies" component={MovieScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="TV Shows" component={TVShowScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

export default AppTabs;
