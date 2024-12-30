const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const tripRoutes = require('./trips');
const { validateToken } = require('../middleware/auth');

router.use('/auth', authRoutes);
router.use('/trips', validateToken, tripRoutes);

module.exports = router;