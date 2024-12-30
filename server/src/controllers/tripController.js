const Trip = require('../models/Trip');
const { generateItinerary, validateItinerary } = require('../services/tripPlanner');
const logger = require('../config/logger');

exports.planTrip = async (req, res) => {
  try {
    const { country, duration } = req.body;
    
    // Générer l'itinéraire avec l'IA
    const suggestion = await generateItinerary(country, duration);
    validateItinerary(suggestion, duration);

    // Créer le trip
    const trip = new Trip({
      user: req.user._id,
      destination: {
        country,
        cities: suggestion.cities.map((city, index) => ({
          ...city,
          order: index
        }))
      },
      duration,
      recommendations: {
        equipment: suggestion.equipment,
        activities: suggestion.cities.flatMap(city => 
          city.activities.map(activity => ({
            name: activity,
            location: city.name
          }))
        )
      }
    });

    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    logger.error('Erreur lors de la planification du voyage:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.addPhoto = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { photoUrl, caption, latitude, longitude } = req.body;

    const trip = await Trip.findOne({ _id: tripId, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }

    trip.photos.push({
      url: photoUrl,
      caption,
      location: { latitude, longitude }
    });

    await trip.save();
    res.json(trip);
  } catch (error) {
    logger.error('Erreur lors de l\'ajout de la photo:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.getTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId)
      .populate('user', 'name');
    
    if (!trip) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }

    // Vérifier si l'utilisateur a accès au voyage
    if (!trip.isPublic && trip.user._id.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    res.json(trip);
  } catch (error) {
    logger.error('Erreur lors de la récupération du voyage:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id })
      .select('-photos')
      .sort('-createdAt');
    res.json(trips);
  } catch (error) {
    logger.error('Erreur lors de la récupération des voyages:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.shareTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, user: req.user._id });
    if (!trip) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }

    trip.isPublic = true;
    await trip.save();

    res.json({
      shareableLink: `${process.env.CLIENT_URL}/trips/${trip.shareableLink}`
    });
  } catch (error) {
    logger.error('Erreur lors du partage du voyage:', error);
    res.status(400).json({ message: error.message });
  }
};