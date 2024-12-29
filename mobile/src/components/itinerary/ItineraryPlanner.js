import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPin, Calendar, Clock, Plus } from 'lucide-react';
import { formatDate } from '../../utils/dates';

const ItineraryPlanner = ({ itinerary = [], onAddStop, onUpdateStop, onDeleteStop }) => {
  const renderStop = ({ item, index }) => (
    <View style={styles.stopContainer}>
      <View style={styles.stopDot} />
      <View style={styles.stopContent}>
        <Text style={styles.stopTitle}>{item.name}</Text>
        <View style={styles.stopDetails}>
          <MapPin size={16} color="#666" />
          <Text style={styles.stopDetail}>{item.address}</Text>
        </View>
        <View style={styles.stopDetails}>
          <Calendar size={16} color="#666" />
          <Text style={styles.stopDetail}>{formatDate(item.date)}</Text>
        </View>
        {item.duration && (
          <View style={styles.stopDetails}>
            <Clock size={16} color="#666" />
            <Text style={styles.stopDetail}>{item.duration} minutes</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={itinerary}
        renderItem={renderStop}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={onAddStop}
      >
        <Plus size={24} color="#FFF" />
        <Text style={styles.addButtonText}>Ajouter une étape</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 15,
  },
  stopContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
    marginTop: 6,
    marginRight: 15,
  },
  stopContent: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stopDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  stopDetail: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    margin: 15,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ItineraryPlanner;