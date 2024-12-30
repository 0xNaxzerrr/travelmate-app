const mongoose = require('mongoose');

const TripSuggestionSchema = new mongoose.Schema({
  country: { type: String, required: true },
  duration: { type: Number, required: true },
  destinations: [{
    city: String,
    days: Number,
    activities: [String],
    description: String
  }],
  recommendedEquipment: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TripSuggestion', TripSuggestionSchema);