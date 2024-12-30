const Redis = require('ioredis');
const logger = require('./logger');

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

redis.on('error', (err) => {
  logger.error('Erreur Redis:', err);
});

redis.on('connect', () => {
  logger.info('Connecté à Redis');
});

// Clés de cache
const CACHE_KEYS = {
  TRIP: (tripId) => `trip:${tripId}`,
  USER_TRIPS: (userId) => `user:${userId}:trips`,
  TRIP_PHOTOS: (tripId) => `trip:${tripId}:photos`
};

// Durées de cache
const CACHE_TTL = {
  TRIP: 3600, // 1 heure
  USER_TRIPS: 1800, // 30 minutes
  TRIP_PHOTOS: 3600 // 1 heure
};

module.exports = {
  redis,
  CACHE_KEYS,
  CACHE_TTL
};