import { Platform } from 'react-native';

export default {
  api: {
    baseURL: process.env.API_BASE_URL,
    timeout: parseInt(process.env.API_TIMEOUT) || 5000
  },
  maps: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    placesApiKey: process.env.GOOGLE_PLACES_API_KEY
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  },
  app: {
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    build: process.env.APP_BUILD
  },
  features: {
    offlineMode: process.env.ENABLE_OFFLINE_MODE === 'true',
    pushNotifications: process.env.ENABLE_PUSH_NOTIFICATIONS === 'true',
    locationTracking: process.env.ENABLE_LOCATION_TRACKING === 'true'
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL) || 3600,
    maxSize: parseInt(process.env.MAX_CACHE_SIZE) || 50
  },
  debug: {
    enableLogging: process.env.ENABLE_LOGGING === 'true',
    enableCrashReporting: process.env.ENABLE_CRASH_REPORTING === 'true'
  }
};