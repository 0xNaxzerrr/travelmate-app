import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/store';

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
        <Tab.Navigator>
          <Tab.Screen 
            name="Accueil" 
            component={HomeScreen}
            options={{
              headerShown: true
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