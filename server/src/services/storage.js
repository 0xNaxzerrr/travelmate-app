const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

// Configuration AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

/**
 * Optimise et upload une image vers S3
 * @param {String} base64Image - Image en base64
 * @param {String} tripId - ID du voyage
 * @returns {Promise<String>} URL de l'image uploadée
 */
const uploadImage = async (base64Image, tripId) => {
  try {
    // Décoder l'image base64
    const buffer = Buffer.from(base64Image, 'base64');

    // Optimiser l'image avec sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(1200, 1200, { // Taille maximale
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 }) // Compression JPEG
      .toBuffer();

    const key = `trips/${tripId}/${uuidv4()}.jpg`;

    // Upload vers S3
    await s3.putObject({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: optimizedBuffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    }).promise();

    // Retourner l'URL publique
    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

/**
 * Supprime une image de S3
 * @param {String} imageUrl - URL de l'image à supprimer
 */
const deleteImage = async (imageUrl) => {
  try {
    const key = imageUrl.split('.com/')[1];
    
    await s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key
    }).promise();
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};

module.exports = {
  uploadImage,
  deleteImage
};