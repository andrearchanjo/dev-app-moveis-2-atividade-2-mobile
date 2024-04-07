import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CoachList from '../pages/CoachList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 100,
                },
                tabBarLabelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16,
                },
                tabBarInactiveBackgroundColor: '#fafafc',
                tabBarActiveBackgroundColor: '#ebebf5',
                tabBarInactiveTintColor: '#c1bcbc',
                tabBarActiveTintColor: '#32264d',
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;

                    if (route.name === 'CoachList') {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    }

                    console.log(iconName);
                    console.log(focused);
                    console.log(color);

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
        <Screen
            name="CoachList"
            component={CoachList}
            options={{
                tabBarLabel: 'Coaches',
                headerShown: false
            }}
        />
        <Screen
            name="Favorites"
            component={Favorites}
            options={{
                tabBarLabel: 'Favoritos',
                headerShown: false
            }}
        />
        </Navigator>
    );
}

export default StudyTabs;