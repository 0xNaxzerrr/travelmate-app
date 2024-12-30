import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Voyages</Text>
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('Planifier')}
      >
        <Text style={styles.addButtonText}>+ Nouveau Voyage</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Voyages à venir</Text>
        {/* Liste des voyages à implémenter */}
        <View style={styles.tripCard}>
          <Text style={styles.tripTitle}>Paris</Text>
          <Text style={styles.tripDate}>15-20 Janvier 2025</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  tripCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  tripDate: {
    color: '#666',
    marginTop: 5,
  },
});