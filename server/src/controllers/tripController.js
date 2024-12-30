const Trip = require('../models/Trip');
const { generateTripPlan, generateShareLink } = require('../services/tripPlanner');
const { uploadPhoto } = require('../services/photoService');

exports.createTrip = async (req, res) => {
  try {
    const { country, duration } = req.body;
    const tripPlan = await generateTripPlan(country, duration);
    const shareLink = generateShareLink();

    const trip = new Trip({
      user: req.user.id,
      country,
      duration,
      destinations: tripPlan.destinations,
      equipment: tripPlan.equipment,
      shareLink
    });

    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPhoto = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { photo, location } = req.body;
    
    const photoUrl = await uploadPhoto(photo);
    
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.photos.push({
      url: photoUrl,
      location: {
        latitude: location.latitude,
        longitude: location.longitude
      }
    });

    await trip.save();
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTripByShareLink = async (req, res) => {
  try {
    const { shareLink } = req.params;
    const trip = await Trip.findOne({ shareLink })
      .select('-user -__v')
      .lean();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id })
      .sort('-createdAt')
      .lean();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
