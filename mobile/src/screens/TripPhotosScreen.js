import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, FlatList, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import TripMap from '../components/TripMap';
import { useDispatch } from 'react-redux';
import { addTripPhoto } from '../redux/slices/tripSlice';

const TripPhotosScreen = ({ route }) => {
  const { trip } = route.params;
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Nous avons besoin de la permission de géolocalisation pour afficher vos photos sur la carte.');
      }
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'Nous avons besoin de la permission d\'accéder à votre caméra.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        await uploadPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de prendre la photo.');
    }
  };

  const uploadPhoto = async (uri) => {
    try {
      setUploading(true);

      // Obtenir la localisation actuelle
      const location = await Location.getCurrentPositionAsync();

      // Convertir l'image en base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Envoyer au serveur
      await dispatch(addTripPhoto({
        tripId: trip._id,
        photoData: {
          base64,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }
        }
      })).unwrap();

      Alert.alert('Succès', 'Photo ajoutée avec succès !');
    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TripMap trip={trip} showPhotos={true} />
      
      <Button
        mode="contained"
        onPress={takePhoto}
        loading={uploading}
        style={styles.button}
        icon="camera"
      >
        Prendre une photo
      </Button>

      <Text style={styles.subtitle}>Photos du voyage</Text>
      <FlatList
        data={trip.photos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: item.url }}
              style={styles.photo}
            />
            {item.caption && (
              <Text style={styles.caption}>{item.caption}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  button: {
    marginVertical: 20
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  photoContainer: {
    marginRight: 10
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 10
  },
  caption: {
    marginTop: 5,
    textAlign: 'center'
  }
});

export default TripPhotosScreen;