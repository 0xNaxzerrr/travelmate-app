const { uploadImage, deleteImage } = require('../services/storage');
const Trip = require('../models/Trip');
const logger = require('../config/logger');

exports.uploadPhoto = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { base64Image, caption, location } = req.body;

    // Vérifier si le voyage existe et appartient à l'utilisateur
    const trip = await Trip.findOne({ _id: tripId, user: req.user._id });
    if (!trip) {
      return res.status(404).json({
        status: 'error',
        message: 'Voyage non trouvé'
      });
    }

    // Upload l'image vers S3
    const photoUrl = await uploadImage(base64Image, tripId);

    // Ajouter la photo au voyage
    trip.photos.push({
      url: photoUrl,
      caption,
      location,
      takenAt: new Date()
    });

    await trip.save();

    res.status(201).json({
      status: 'success',
      data: trip.photos[trip.photos.length - 1]
    });

  } catch (error) {
    logger.error('Erreur lors de l\'upload de la photo:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de l\'upload de la photo'
    });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const { tripId, photoId } = req.params;

    const trip = await Trip.findOne({ _id: tripId, user: req.user._id });
    if (!trip) {
      return res.status(404).json({
        status: 'error',
        message: 'Voyage non trouvé'
      });
    }

    const photo = trip.photos.id(photoId);
    if (!photo) {
      return res.status(404).json({
        status: 'error',
        message: 'Photo non trouvée'
      });
    }

    // Supprimer l'image de S3
    await deleteImage(photo.url);

    // Supprimer la photo du voyage
    photo.remove();
    await trip.save();

    res.json({
      status: 'success',
      message: 'Photo supprimée avec succès'
    });

  } catch (error) {
    logger.error('Erreur lors de la suppression de la photo:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la suppression de la photo'
    });
  }
};

exports.getTripPhotos = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findOne({ _id: tripId, user: req.user._id })
      .select('photos');

    if (!trip) {
      return res.status(404).json({
        status: 'error',
        message: 'Voyage non trouvé'
      });
    }

    res.json({
      status: 'success',
      data: trip.photos
    });

  } catch (error) {
    logger.error('Erreur lors de la récupération des photos:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des photos'
    });
  }
};