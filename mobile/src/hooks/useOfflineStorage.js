import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';

export const useOfflineStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      if (state.isConnected) {
        // Sync offline data when back online
        try {
          const offlineActions = await AsyncStorage.getItem('offlineActions');
          if (offlineActions) {
            const actions = JSON.parse(offlineActions);
            actions.forEach(action => dispatch(action));
            await AsyncStorage.removeItem('offlineActions');
          }
        } catch (error) {
          console.error('Error syncing offline data:', error);
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const saveOfflineAction = async (action) => {
    try {
      const existingActions = await AsyncStorage.getItem('offlineActions');
      const actions = existingActions ? JSON.parse(existingActions) : [];
      actions.push(action);
      await AsyncStorage.setItem('offlineActions', JSON.stringify(actions));
    } catch (error) {
      console.error('Error saving offline action:', error);
    }
  };

  return { saveOfflineAction };
};