const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  duration: { type: Number, required: true }, // durée en jours
  order: { type: Number, required: true } // ordre dans l'itinéraire
});

const PhotoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  takenAt: { type: Date, default: Date.now }
});

const TripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    country: { type: String, required: true },
    cities: [LocationSchema]
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: Number, required: true }, // durée totale en jours
  status: {
    type: String,
    enum: ['planned', 'ongoing', 'completed'],
    default: 'planned'
  },
  photos: [PhotoSchema],
  recommendations: {
    equipment: [{
      item: String,
      reason: String,
      priority: { type: String, enum: ['high', 'medium', 'low'] }
    }],
    activities: [{
      name: String,
      location: String,
      description: String
    }]
  },
  shareableLink: { type: String, unique: true },
  isPublic: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Middleware pour générer un lien partageable unique
TripSchema.pre('save', function(next) {
  if (!this.shareableLink) {
    this.shareableLink = `trip-${this._id}-${Math.random().toString(36).substring(7)}`;
  }
  next();
});

module.exports = mongoose.model('Trip', TripSchema);