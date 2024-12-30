const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    logger.info(`MongoDB Connecté: ${conn.connection.host}`);

    // Gérer les événements de connexion
    mongoose.connection.on('error', (err) => {
      logger.error('Erreur MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB Déconnecté');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB Reconnecté');
    });

    // Gérer les signaux de fermeture
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        logger.info('MongoDB déconnecté suite à l\'arrêt de l\'application');
        process.exit(0);
      } catch (err) {
        logger.error('Erreur lors de la fermeture de MongoDB:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    logger.error('Erreur de connexion MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;