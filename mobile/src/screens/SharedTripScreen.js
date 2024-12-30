import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Share, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import TripMap from '../components/TripMap';
import { API_URL } from '../config';

const SharedTripScreen = ({ route }) => {
  const { shareableLink } = route.params;
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTripDetails();
  }, []);

  const fetchTripDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/api/trips/shared/${shareableLink}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      
      setTrip(data);
    } catch (error) {
      console.error('Error fetching trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Suivez mon voyage en ${trip.destination.country} : ${API_URL}/trips/shared/${shareableLink}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!trip) {
    return (
      <View style={styles.centerContainer}>
        <Text>Voyage introuvable</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Voyage en {trip.destination.country}
        </Text>
        <Text style={styles.subtitle}>
          Par {trip.user.name}
        </Text>
        <Button
          mode="contained"
          onPress={handleShare}
          icon="share"
          style={styles.shareButton}
        >
          Partager
        </Button>
      </View>

      <TripMap trip={trip} showPhotos={true} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Itinéraire</Text>
        {trip.destination.cities.map((city, index) => (
          <View key={index} style={styles.cityItem}>
            <Text style={styles.cityName}>{city.city}</Text>
            <Text style={styles.duration}>{city.duration} jours</Text>
            <Text style={styles.activities}>
              Activités : {city.activities.join(', ')}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Photos du voyage</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.photoGallery}
        >
          {trip.photos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image
                source={{ uri: photo.url }}
                style={styles.photo}
              />
              {photo.caption && (
                <Text style={styles.photoCaption}>{photo.caption}</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Équipement recommandé</Text>
        {trip.recommendations.equipment.map((item, index) => (
          <View key={index} style={styles.equipmentItem}>
            <Text style={styles.equipmentName}>{item.item}</Text>
            <Text style={styles.equipmentReason}>{item.reason}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5
  },
  shareButton: {
    marginTop: 10
  },
  section: {
    padding: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  cityItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  duration: {
    fontSize: 16,
    color: '#666',
    marginTop: 5
  },
  activities: {
    marginTop: 5,
    color: '#444'
  },
  photoGallery: {
    flexDirection: 'row',
    marginTop: 10
  },
  photoContainer: {
    marginRight: 15
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 10
  },
  photoCaption: {
    marginTop: 5,
    textAlign: 'center',
    color: '#666'
  },
  equipmentItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  equipmentName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  equipmentReason: {
    marginTop: 5,
    color: '#666'
  }
});

export default SharedTripScreen;