import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TripCard from '../components/TripCard';
import { fetchTrips } from '../store/slices/tripSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const trips = useSelector(state => state.trips.items);

  React.useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tripsContainer}>
        {trips.map(trip => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  tripsContainer: {
    padding: 15
  }
});