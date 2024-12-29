const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Auth API', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  describe('POST /api/auth/register', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });

      expect(response.status).toBe(201);
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login existing user', async () => {
      // Create user first
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });

      // Try to login
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });
});