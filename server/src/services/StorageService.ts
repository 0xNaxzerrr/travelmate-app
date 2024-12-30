import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { config } from '../config';

export class StorageService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
      region: config.aws.region
    });
  }

  async uploadPhoto(base64Image: string, tripId: string): Promise<string> {
    try {
      // Décoder l'image base64
      const buffer = Buffer.from(
        base64Image.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );

      // Optimiser l'image
      const optimizedBuffer = await sharp(buffer)
        .resize(1200, 1200, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({
          quality: 80,
          progressive: true
        })
        .toBuffer();

      const key = `trips/${tripId}/${uuidv4()}.jpg`;

      await this.s3
        .putObject({
          Bucket: config.aws.s3Bucket,
          Key: key,
          Body: optimizedBuffer,
          ContentType: 'image/jpeg',
          ACL: 'public-read'
        })
        .promise();

      return `https://${config.aws.s3Bucket}.s3.${config.aws.region}.amazonaws.com/${key}`;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }

  async deletePhoto(imageUrl: string): Promise<void> {
    try {
      const key = imageUrl.split('.com/')[1];

      await this.s3
        .deleteObject({
          Bucket: config.aws.s3Bucket,
          Key: key
        })
        .promise();
    } catch (error) {
      console.error('Error deleting image:', error);
      throw new Error('Failed to delete image');
    }
  }
}