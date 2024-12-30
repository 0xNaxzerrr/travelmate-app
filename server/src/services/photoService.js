const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.uploadPhoto = async (base64Image) => {
  try {
    // Décodage de l'image base64
    const buffer = Buffer.from(base64Image.split(',')[1], 'base64');
    
    // Redimensionnement et optimisation de l'image
    const optimizedBuffer = await sharp(buffer)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    const fileName = `${Date.now()}.jpg`;
    
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `trip-photos/${fileName}`,
      Body: optimizedBuffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    };

    const result = await s3.upload(uploadParams).promise();
    return result.Location;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw new Error('Failed to upload photo');
  }
};