import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

// Ignorer l'avertissement topInsetsChange
LogBox.ignoreLogs(['Unsupported top level event type "topInsetsChange" dispatched']);

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}