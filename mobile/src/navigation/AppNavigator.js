import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TripPlanningScreen from '../screens/TripPlanningScreen';
import TripPhotosScreen from '../screens/TripPhotosScreen';
import SharedTripScreen from '../screens/SharedTripScreen';
import TripsListScreen from '../screens/TripsListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // Main Stack
          <>
            <Stack.Screen
              name="Trips"
              component={TripsListScreen}
              options={{
                title: 'Mes Voyages',
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('PlanTrip')}
                    icon="plus"
                    mode="text"
                  >
                    Nouveau
                  </Button>
                ),
              }}
            />
            <Stack.Screen
              name="PlanTrip"
              component={TripPlanningScreen}
              options={{ title: 'Planifier un voyage' }}
            />
            <Stack.Screen
              name="TripPhotos"
              component={TripPhotosScreen}
              options={{ title: 'Photos du voyage' }}
            />
            <Stack.Screen
              name="SharedTrip"
              component={SharedTripScreen}
              options={{ title: 'Voyage partagé' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;