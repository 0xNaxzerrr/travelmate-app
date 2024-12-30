import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import TripMap from '../components/TripMap';
import { createTrip } from '../redux/slices/tripSlice';

const TripPlanningScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedTrip, setSuggestedTrip] = useState(null);

  const handlePlanTrip = async () => {
    if (!country || !duration) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/trips/plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country,
          duration: parseInt(duration)
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuggestedTrip(data);
    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmTrip = async () => {
    try {
      await dispatch(createTrip(suggestedTrip)).unwrap();
      Alert.alert('Succès', 'Votre voyage a été créé !', [
        { text: 'OK', onPress: () => navigation.navigate('Trips') }
      ]);
    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Planifier votre voyage</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Pays de destination"
          value={country}
          onChangeText={setCountry}
        />

        <TextInput
          style={styles.input}
          placeholder="Durée (jours)"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />

        <Button
          mode="contained"
          onPress={handlePlanTrip}
          loading={loading}
          style={styles.button}
        >
          Générer un itinéraire
        </Button>

        {suggestedTrip && (
          <View style={styles.suggestionContainer}>
            <Text style={styles.subtitle}>Itinéraire suggéré</Text>
            
            <TripMap trip={suggestedTrip} />

            {suggestedTrip.destination.cities.map((city, index) => (
              <View key={index} style={styles.cityCard}>
                <Text style={styles.cityName}>{city.city}</Text>
                <Text>{city.duration} jours</Text>
                <Text style={styles.activities}>
                  Activités suggérées :
                  {city.activities.join(', ')}
                </Text>
              </View>
            ))}

            <View style={styles.equipmentSection}>
              <Text style={styles.subtitle}>Équipement recommandé</Text>
              {suggestedTrip.recommendations.equipment.map((item, index) => (
                <View key={index} style={styles.equipmentItem}>
                  <Text>{item.item}</Text>
                  <Text style={styles.equipmentReason}>{item.reason}</Text>
                </View>
              ))}
            </View>

            <Button
              mode="contained"
              onPress={handleConfirmTrip}
              style={styles.button}
            >
              Confirmer cet itinéraire
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  form: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },
  button: {
    marginVertical: 10
  },
  suggestionContainer: {
    marginTop: 20
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  cityCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  activities: {
    marginTop: 5,
    color: '#666'
  },
  equipmentSection: {
    marginTop: 20
  },
  equipmentItem: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5
  },
  equipmentReason: {
    color: '#666',
    fontSize: 12,
    marginTop: 5
  }
});

export default TripPlanningScreen;