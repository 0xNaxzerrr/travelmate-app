const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    name: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  checklist: [{
    item: String,
    completed: Boolean
  }],
  itinerary: [{
    name: String,
    location: {
      lat: Number,
      lng: Number
    },
    date: Date,
    notes: String
  }],
  photos: [{
    url: String,
    location: {
      lat: Number,
      lng: Number
    },
    date: Date,
    caption: String
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;