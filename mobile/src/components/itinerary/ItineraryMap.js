import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const ItineraryMap = ({ itinerary = [] }) => {
  if (itinerary.length === 0) return null;

  const initialRegion = {
    latitude: itinerary[0].location.latitude,
    longitude: itinerary[0].location.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {itinerary.map((stop, index) => (
          <Marker
            key={index}
            coordinate={stop.location}
            title={stop.name}
          />
        ))}
        <Polyline
          coordinates={itinerary.map(stop => stop.location)}
          strokeColor="#007AFF"
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginVertical: 15,
  },
  map: {
    flex: 1,
    borderRadius: 12,
  },
});

export default ItineraryMap;