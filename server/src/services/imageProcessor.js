const sharp = require('sharp');
const logger = require('../config/logger');

const THUMB_SIZE = 300;
const MEDIUM_SIZE = 800;
const QUALITY = 80;

const processImage = async (buffer, options = {}) => {
  try {
    // Obtenir les métadonnées de l'image
    const metadata = await sharp(buffer).metadata();

    // Créer versions redimensionnées
    const [thumbnail, medium, full] = await Promise.all([
      // Miniature
      sharp(buffer)
        .resize(THUMB_SIZE, THUMB_SIZE, {
          fit: 'cover',
          position: 'attention'
        })
        .jpeg({ quality: QUALITY })
        .toBuffer(),

      // Version moyenne
      sharp(buffer)
        .resize(MEDIUM_SIZE, MEDIUM_SIZE, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: QUALITY })
        .toBuffer(),

      // Version complète optimisée
      sharp(buffer)
        .jpeg({ quality: QUALITY })
        .toBuffer()
    ]);

    return {
      thumbnail,
      medium,
      full,
      metadata: {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: metadata.size
      }
    };
  } catch (error) {
    logger.error('Erreur traitement image:', error);
    throw new Error('Erreur lors du traitement de l\'image');
  }
};

const stripExif = async (buffer) => {
  try {
    return await sharp(buffer)
      .withMetadata({
        // Conserver uniquement l'orientation
        orientation: true
      })
      .toBuffer();
  } catch (error) {
    logger.error('Erreur suppression EXIF:', error);
    return buffer; // Retourner l'image originale en cas d'erreur
  }
};

module.exports = {
  processImage,
  stripExif
};