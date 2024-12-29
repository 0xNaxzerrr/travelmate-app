import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TripCard({ trip }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('TripDetails', { tripId: trip.id })}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{trip.title}</Text>
        <Text style={styles.date}>{trip.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  content: {
    padding: 15
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5
  },
  date: {
    fontSize: 14,
    color: '#666'
  }
});