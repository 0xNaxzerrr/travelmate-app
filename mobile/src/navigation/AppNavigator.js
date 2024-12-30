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
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Accueil':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Carte':
            iconName = focused ? 'map' : 'map-outline';
            break;
          case 'Planifier':
            iconName = focused ? 'calendar' : 'calendar-outline';
            break;
          case 'Profil':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'ellipsis-horizontal';
        }

        return <Ionicons name={iconName} size={24} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Accueil" component={HomeScreen} />
    <Tab.Screen name="Carte" component={MapScreen} />
    <Tab.Screen name="Planifier" component={PlannerScreen} />
    <Tab.Screen name="Profil" component={ProfileScreen} />
  </Tab.Navigator>
);

export default function AppNavigator() {
  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'default'
        }}
      >
        {!isAuthenticated ? (
          // Routes d'authentification
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
          // Routes principales de l'application
          <Stack.Screen name="MainApp" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}