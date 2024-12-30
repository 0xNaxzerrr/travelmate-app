import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// App Screens
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import PlannerScreen from '../screens/PlannerScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { height: 60 },
      tabBarIconStyle: { marginTop: 5 },
      tabBarLabelStyle: { marginBottom: 5 }
    }}
  >
    <Tab.Screen 
      name="Accueil" 
      component={HomeScreen} 
      options={({ route }) => ({
        tabBarIcon: ({ focused, color }) => (
          <Ionicons 
            name={focused ? 'home' : 'home-outline'} 
            size={24} 
            color={color} 
          />
        ),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    />
    <Tab.Screen 
      name="Carte" 
      component={MapScreen} 
      options={({ route }) => ({
        tabBarIcon: ({ focused, color }) => (
          <Ionicons 
            name={focused ? 'map' : 'map-outline'} 
            size={24} 
            color={color} 
          />
        ),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    />
    <Tab.Screen 
      name="Planifier" 
      component={PlannerScreen} 
      options={({ route }) => ({
        tabBarIcon: ({ focused, color }) => (
          <Ionicons 
            name={focused ? 'calendar' : 'calendar-outline'} 
            size={24} 
            color={color} 
          />
        ),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    />
    <Tab.Screen 
      name="Profil" 
      component={ProfileScreen} 
      options={({ route }) => ({
        tabBarIcon: ({ focused, color }) => (
          <Ionicons 
            name={focused ? 'person' : 'person-outline'} 
            size={24} 
            color={color} 
          />
        ),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    />
  </Tab.Navigator>
);

export default function AppNavigator() {
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{
                headerShown: true,
                title: 'Connexion'
              }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              options={{
                headerShown: true,
                title: 'Inscription'
              }}
            />
          </>
        ) : (
          <Stack.Screen name="MainApp" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}