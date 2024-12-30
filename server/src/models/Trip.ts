import { Schema, model, Document } from 'mongoose';
import { ITrip, IPhoto, IEquipment } from '../interfaces/ITrip';

export interface TripDocument extends ITrip, Document {}

const locationSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

const citySchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  coordinates: { type: locationSchema, required: true },
  duration: { type: Number, required: true },
  activities: [String]
});

const photoSchema = new Schema({
  url: { type: String, required: true },
  caption: String,
  location: { type: locationSchema, required: true },
  takenAt: { type: Date, default: Date.now }
});

const equipmentSchema = new Schema({
  item: { type: String, required: true },
  reason: String,
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  }
});

const tripSchema = new Schema<TripDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    country: { type: String, required: true },
    cities: [citySchema]
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  status: {
    type: String,
    enum: ['planned', 'ongoing', 'completed'],
    default: 'planned'
  },
  photos: [photoSchema],
  recommendations: {
    equipment: [equipmentSchema]
  },
  shareableLink: { type: String, unique: true, sparse: true },
  isPublic: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Middleware pour générer un lien partageable unique
tripSchema.pre('save', function(next) {
  if (this.isNew && !this.shareableLink) {
    this.shareableLink = `trip-${this._id}-${Math.random().toString(36).substring(7)}`;
  }
  next();
});

export const Trip = model<TripDocument>('Trip', tripSchema);