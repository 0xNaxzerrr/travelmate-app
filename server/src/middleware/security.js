const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par fenêtre
});

exports.setupSecurity = (app) => {
  // Protection contre les vulnérabilités web courantes
  app.use(helmet());
  
  // Limit rate pour toutes les routes API
  app.use('/api/', exports.limiter);
  
  // Configuration CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
};