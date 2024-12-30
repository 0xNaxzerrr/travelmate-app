const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');

// Create trip
router.post('/', auth, async (req, res) => {
  try {
    const trip = new Trip({
      ...req.body,
      owner: req.user._id
    });

    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error creating trip' });
  }
});

// Get all trips
router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ owner: req.user._id });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips' });
  }
});

// Get single trip
router.get('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip' });
  }
});

// Update trip
router.put('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip' });
  }
});

// Delete trip
router.delete('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json({ message: 'Trip deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip' });
  }
});

module.exports = router;