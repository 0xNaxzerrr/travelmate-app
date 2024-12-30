const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TravelMate API',
      version: '1.0.0',
      description: 'API documentation for TravelMate application'
    },
    servers: [{
      url: 'http://localhost:3000'
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: [
    './src/routes/*.js'
  ]
};

module.exports = swaggerJSDoc(options);