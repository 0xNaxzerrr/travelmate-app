import React, { useState } from 'react';
import { View, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'lucide-react';
import { launchCamera } from 'react-native-image-picker';
import { getCurrentLocation } from '../../utils/location';

const PhotoGallery = ({ photos = [], onPhotoAdd }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleTakePhoto = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: true,
    };

    try {
      const response = await launchCamera(options);
      if (response.assets) {
        const location = await getCurrentLocation();
        onPhotoAdd({
          uri: response.assets[0].uri,
          location,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.cameraButton}
        onPress={handleTakePhoto}
      >
        <Camera size={24} color="#007AFF" />
      </TouchableOpacity>
      <FlatList
        data={photos}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.photoContainer}
            onPress={() => setSelectedPhoto(item)}
          >
            <Image source={{ uri: item.uri }} style={styles.photo} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.photoGrid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoGrid: {
    padding: 5,
  },
  photoContainer: {
    flex: 1/3,
    aspectRatio: 1,
    padding: 5,
  },
  photo: {
    flex: 1,
    borderRadius: 8,
  },
  cameraButton: {
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    margin: 15,
  },
});

export default PhotoGallery;