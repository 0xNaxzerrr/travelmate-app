import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './config';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TravelMate API',
      version: '1.0.0',
      description: 'API documentation for TravelMate application'
    },
    servers: [
      {
        url: config.apiUrl,
        description: config.nodeEnv === 'production' ? 'Production server' : 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Trip: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            destination: {
              type: 'object',
              properties: {
                country: { type: 'string' },
                cities: { type: 'array', items: { $ref: '#/components/schemas/City' } }
              }
            },
            duration: { type: 'number' },
            status: { type: 'string', enum: ['PLANNED', 'ONGOING', 'COMPLETED'] },
            photos: { type: 'array', items: { $ref: '#/components/schemas/Photo' } }
          }
        },
        City: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            coordinates: {
              type: 'object',
              properties: {
                latitude: { type: 'number' },
                longitude: { type: 'number' }
              }
            },
            duration: { type: 'number' },
            activities: { type: 'array', items: { type: 'string' } }
          }
        },
        Photo: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            caption: { type: 'string' },
            location: {
              type: 'object',
              properties: {
                latitude: { type: 'number' },
                longitude: { type: 'number' }
              }
            },
            takenAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;