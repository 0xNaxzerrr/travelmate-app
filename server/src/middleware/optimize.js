const compression = require('compression');
const helmet = require('helmet');

const setupOptimization = (app) => {
  // Compression gzip
  app.use(compression({
    filter: (req, res) => {
      // Ne pas compresser les images déjà compressées
      if (req.headers['content-type']?.includes('image/')) {
        return false;
      }
      return compression.filter(req, res);
    },
    level: 6 // Niveau de compression (1-9)
  }));

  // Headers de sécurité
  app.use(helmet());

  // Cache Control
  app.use((req, res, next) => {
    // Cache statique pour les images
    if (req.path.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      res.set('Cache-Control', 'public, max-age=31536000'); // 1 an
    }
    // Cache court pour les données dynamiques
    else if (req.path.startsWith('/api/')) {
      res.set('Cache-Control', 'private, max-age=0, must-revalidate');
    }
    next();
  });

  // Cors optimisé
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Max-Age', '86400'); // 24 heures
    next();
  });
};

module.exports = setupOptimization;