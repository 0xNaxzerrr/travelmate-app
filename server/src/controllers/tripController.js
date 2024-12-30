const Trip = require('../models/Trip');
const { generateItinerary } = require('../services/tripPlanner');
const { uploadImage } = require('../services/storage');
const logger = require('../config/logger');
const { redis, CACHE_KEYS, CACHE_TTL } = require('../config/redis');

exports.planTrip = async (req, res) => {
  try {
    const { country, duration } = req.body;
    
    // Générer l'itinéraire
    const suggestion = await generateItinerary(country, duration);

    // Créer le voyage
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
      recommendations: suggestion.recommendations
    });

    await trip.save();

    // Invalider le cache des voyages de l'utilisateur
    await redis.del(CACHE_KEYS.USER_TRIPS(req.user._id));

    res.status(201).json(trip);
  } catch (error) {
    logger.error('Erreur creation voyage:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const { tripId } = req.params;
    const cacheKey = CACHE_KEYS.TRIP(tripId);

    // Vérifier le cache
    const cachedTrip = await redis.get(cacheKey);
    if (cachedTrip) {
      return res.json(JSON.parse(cachedTrip));
    }

    const trip = await Trip.findOne({ 
      _id: tripId,
      $or: [
        { user: req.user._id },
        { isPublic: true }
      ]
    });

    if (!trip) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }

    // Mettre en cache
    await redis.setex(cacheKey, CACHE_TTL.TRIP, JSON.stringify(trip));

    res.json(trip);
  } catch (error) {
    logger.error('Erreur récupération voyage:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getUserTrips = async (req, res) => {
  try {
    const cacheKey = CACHE_KEYS.USER_TRIPS(req.user._id);

    // Vérifier le cache
    const cachedTrips = await redis.get(cacheKey);
    if (cachedTrips) {
      return res.json(JSON.parse(cachedTrips));
    }

    const trips = await Trip.find({ user: req.user._id })
      .sort('-createdAt')
      .select('-photos.base64'); // Exclure les données lourdes

    // Mettre en cache
    await redis.setex(cacheKey, CACHE_TTL.USER_TRIPS, JSON.stringify(trips));

    res.json(trips);
  } catch (error) {
    logger.error('Erreur récupération voyages:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findOneAndUpdate(
      { _id: tripId, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }

    // Invalider les caches
    await Promise.all([
      redis.del(CACHE_KEYS.TRIP(tripId)),
      redis.del(CACHE_KEYS.USER_TRIPS(req.user._id))
    ]);

    res.json(trip);
  } catch (error) {
    logger.error('Erreur mise à jour voyage:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.shareTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    trip.isPublic = true;
    await trip.save();

    // Invalider le cache
    await redis.del(CACHE_KEYS.TRIP(tripId));

    res.json({
      shareLink: `${process.env.CLIENT_URL}/trips/${trip.shareableLink}`
    });
  } catch (error) {
    logger.error('Erreur partage voyage:', error);
    res.status(500).json({ message: error.message });
  }
};