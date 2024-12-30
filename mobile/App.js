import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './src/store';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import PlannerScreen from './src/screens/PlannerScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Accueil') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Carte') {
                iconName = focused ? 'map' : 'map-outline';
              } else if (route.name === 'Planifier') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (route.name === 'Profil') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Accueil" 
            component={HomeScreen}
            options={{
              headerShown: true,
              headerTitle: 'TravelMate',
            }}
          />
          <Tab.Screen 
            name="Carte" 
            component={MapScreen}
            options={{
              headerShown: true
            }}
          />
          <Tab.Screen 
            name="Planifier" 
            component={PlannerScreen}
            options={{
              headerShown: true
            }}
          />
          <Tab.Screen 
            name="Profil" 
            component={ProfileScreen}
            options={{
              headerShown: true
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}