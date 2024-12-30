import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Text, Card, Button, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTrips, shareTrip } from '../redux/slices/tripSlice';

const TripCard = ({ trip, navigation, onShare }) => {
  const formattedDate = (date) => new Date(date).toLocaleDateString();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text style={styles.destination}>{trip.destination.country}</Text>
          <IconButton
            icon="share"
            onPress={() => onShare(trip._id)}
          />
        </View>
        
        <Text style={styles.dates}>
          {formattedDate(trip.startDate)} - {formattedDate(trip.endDate)}
        </Text>
        
        <Text style={styles.cities}>
          {trip.destination.cities.map(city => city.city).join(' → ')}
        </Text>

        <View style={styles.statsRow}>
          <Text>{trip.duration} jours</Text>
          <Text>{trip.photos?.length || 0} photos</Text>
        </View>
      </Card.Content>

      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('TripPhotos', { trip })}
        >
          Voir les photos
        </Button>
      </Card.Actions>
    </Card>
  );
};

const TripsListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { trips, loading } = useSelector((state) => state.trips);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = () => {
    dispatch(fetchUserTrips());
  };

  const handleShare = async (tripId) => {
    try {
      const result = await dispatch(shareTrip(tripId)).unwrap();
      // Ouvrir l'écran de partage avec le lien
      navigation.navigate('SharedTrip', { shareableLink: result.shareableLink });
    } catch (error) {
      console.error('Error sharing trip:', error);
    }
  };

  const renderTrip = ({ item }) => (
    <TripCard
      trip={item}
      navigation={navigation}
      onShare={handleShare}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        renderItem={renderTrip}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadTrips}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Vous n'avez pas encore de voyage planifié
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('PlanTrip')}
              style={styles.planButton}
            >
              Planifier un voyage
            </Button>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  listContent: {
    padding: 16
  },
  card: {
    marginBottom: 16
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  destination: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  dates: {
    color: '#666',
    marginVertical: 4
  },
  cities: {
    marginTop: 8
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16
  },
  planButton: {
    marginTop: 8
  }
});

export default TripsListScreen;