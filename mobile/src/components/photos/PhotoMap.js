import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const PhotoMap = ({ photos = [] }) => {
  const initialRegion = photos[0]?.location || {
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {photos.map((photo, index) => (
          <Marker
            key={index}
            coordinate={photo.location}
            title={`Photo ${index + 1}`}
          />
        ))}
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

export default PhotoMap;