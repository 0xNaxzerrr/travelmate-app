const express = require('express');
const router = express.Router();
const tripSuggestionController = require('../controllers/tripSuggestionController');

router.post('/generate', tripSuggestionController.generateTripSuggestion);
router.get('/', tripSuggestionController.getTripSuggestion);

module.exports = router;