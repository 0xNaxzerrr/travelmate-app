import { app } from './server';
import { config } from './config';
import { logger } from './config/logger';
import { prisma } from './lib/prisma';

const startServer = async () => {
  try {
    const port = config.port;

    // Vérifier la connexion à la base de données
    await prisma.$connect();
    logger.info('Connected to database');

    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();