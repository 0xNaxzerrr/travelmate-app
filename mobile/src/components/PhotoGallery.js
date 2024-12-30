import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

const PhotoGallery = ({ photos, onPhotoPress, onPhotoLongPress }) => {
  const handlePhotoPress = (photo) => {
    Haptics.selectionAsync();
    onPhotoPress?.(photo);
  };

  const handlePhotoLongPress = (photo) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPhotoLongPress?.(photo);
  };

  const renderPhoto = ({ item }) => (
    <TouchableOpacity
      style={styles.photoContainer}
      onPress={() => handlePhotoPress(item)}
      onLongPress={() => handlePhotoLongPress(item)}
    >
      <Image
        source={{ uri: item.url }}
        style={styles.photo}
      />
      {item.caption && (
        <Text style={styles.caption} numberOfLines={2}>
          {item.caption}
        </Text>
      )}
      <Text style={styles.date}>
        {new Date(item.takenAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={photos}
      renderItem={renderPhoto}
      keyExtractor={(item) => item._id}
      numColumns={2}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>Aucune photo pour le moment</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  photoContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5
  },
  photo: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  caption: {
    padding: 8,
    fontSize: 12
  },
  date: {
    padding: 8,
    paddingTop: 0,
    fontSize: 10,
    color: '#666'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
});

export default PhotoGallery;