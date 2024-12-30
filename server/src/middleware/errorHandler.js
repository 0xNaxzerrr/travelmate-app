const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  // Log l'erreur
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body
  });

  // Gérer les erreurs de validation mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  // Gérer les erreurs JWT
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: 'Token invalide ou expiré'
    });
  }

  // Gérer les erreurs de dupplication MongoDB
  if (err.code === 11000) {
    return res.status(400).json({
      status: 'error',
      message: 'Cette ressource existe déjà'
    });
  }

  // Erreur par défaut
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
};

module.exports = errorHandler;