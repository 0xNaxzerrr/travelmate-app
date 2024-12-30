const TripSuggestionService = require('../services/tripSuggestionService');

exports.generateTripSuggestion = async (req, res) => {
  try {
    const { country, duration } = req.body;

    // Vérifier si une suggestion existe déjà
    let suggestion = await TripSuggestionService.getTripSuggestion(country, duration);

    // Si non, générer une nouvelle suggestion
    if (!suggestion) {
      suggestion = await TripSuggestionService.generateTripSuggestion(country, duration);
    }

    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la génération de la suggestion' });
  }
};

exports.getTripSuggestion = async (req, res) => {
  try {
    const { country, duration } = req.query;
    const suggestion = await TripSuggestionService.getTripSuggestion(country, duration);

    if (!suggestion) {
      return res.status(404).json({ message: 'Aucune suggestion trouvée' });
    }

    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la suggestion' });
  }
};