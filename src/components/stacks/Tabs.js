import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TVShowScreen from '../screens/TVShows';
import MovieScreen from '../screens/Movies';
import SearchScreen from '../screens/Search';

const Tab = createMaterialTopTabNavigator();

const AppTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Movies" component={MovieScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="TV Shows" component={TVShowScreen} />
        </Tab.Navigator>
    );
}

export default AppTabs