const Redis = require('redis');

const redis = Redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redis.on('error', (err) => console.log('Redis Client Error', err));

const initRedis = async () => {
  await redis.connect();
};

module.exports = { redis, initRedis };