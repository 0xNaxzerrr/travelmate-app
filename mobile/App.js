import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

// Explicitly enable native screens
enableScreens(false);

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}