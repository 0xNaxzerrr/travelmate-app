import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const TripSuggestionScreen = ({ route, navigation }) => {
  const { country, duration } = route.params;
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripSuggestion = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/trips/suggestions/generate', {
          country,
          duration
        });
        setSuggestion(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur de suggestion:', error);
        setLoading(false);
      }
    };

    fetchTripSuggestion();
  }, [country, duration]);

  if (loading) {
    return <Text>Chargement de la suggestion...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Suggestion de voyage en {country}</Text>
      
      {suggestion.destinations.map((dest, index) => (
        <View key={index} style={styles.destinationCard}>
          <Text style={styles.cityTitle}>{dest.city}</Text>
          <Text>Durée : {dest.days} jours</Text>
          <Text>Activités :</Text>
          {dest.activities.map((activity, idx) => (
            <Text key={idx}>- {activity}</Text>
          ))}
        </View>
      ))}

      <View style={styles.equipmentSection}>
        <Text style={styles.sectionTitle}>Équipement recommandé</Text>
        {suggestion.recommendedEquipment.map((item, index) => (
          <Text key={index}>- {item}</Text>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.confirmButton}
        onPress={() => navigation.navigate('TripConfirmation', { suggestion })}
      >
        <Text style={styles.confirmButtonText}>Confirmer le voyage</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  destinationCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  cityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  equipmentSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default TripSuggestionScreen;