require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  cloudStorage: {
    bucket: process.env.CLOUD_STORAGE_BUCKET,
    region: process.env.CLOUD_STORAGE_REGION
  },
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD
  },
  fcm: {
    serverKey: process.env.FCM_SERVER_KEY
  },
  security: {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
    rateLimit: {
      window: parseInt(process.env.RATE_LIMIT_WINDOW) || 15,
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
    }
  }
};