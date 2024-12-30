require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const { helmet, limiter } = require('./middleware/security');
const errorHandler = require('./middleware/errorHandler');
const { initRedis } = require('./config/redis');
const logger = require('./config/logger');

const app = express();

// Middleware
app.use(helmet());
app.use('/api', limiter);
app.use(compression());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Initialize Redis
initRedis().catch(err => logger.error('Redis connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trips'));

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;