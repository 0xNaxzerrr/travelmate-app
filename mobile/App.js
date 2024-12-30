import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import store from './src/store';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import PlannerScreen from './src/screens/PlannerScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
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
              headerTitleStyle: {
                fontSize: 18
              }
            })}
          >
            <Tab.Screen 
              name="Accueil" 
              component={HomeScreen}
              options={{
                headerTitle: 'TravelMate'
              }}
            />
            <Tab.Screen name="Carte" component={MapScreen} />
            <Tab.Screen name="Planifier" component={PlannerScreen} />
            <Tab.Screen name="Profil" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}