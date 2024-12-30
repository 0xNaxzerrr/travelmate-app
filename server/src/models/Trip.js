const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  country: { type: String, required: true },
  duration: { type: Number, required: true },
  destinations: [{
    city: String,
    days: Number,
    activities: [String]
  }],
  equipments: [String],
  photos: [{
    url: String,
    location: {
      latitude: Number,
      longitude: Number
    },
    date: { type: Date, default: Date.now }
  }],
  shareLink: { type: String },
  status: { 
    type: String, 
    enum: ['planned', 'ongoing', 'completed'], 
    default: 'planned' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);