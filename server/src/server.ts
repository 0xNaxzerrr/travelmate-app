import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { setupOptimization } from './middleware/optimize';

// Routes
import authRoutes from './routes/auth';
import tripRoutes from './routes/trips';

const app: Express = express();

// Middleware de base
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: config.clientUrl,
  credentials: true
}));

// Sécurité et optimisation
app.use(helmet());
setupOptimization(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

// Swagger documentation
if (config.nodeEnv === 'development') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocs = require('./swagger');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

// Gestion des erreurs
app.use(errorHandler);

export { app };