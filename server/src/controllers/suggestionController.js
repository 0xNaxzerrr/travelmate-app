const SuggestionService = require('../services/suggestionService');

exports.generateTripSuggestion = async (req, res) => {
  try {
    const { country, duration } = req.body;
    const suggestion = await SuggestionService.generateTripSuggestion(country, duration);
    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur de génération de suggestion' });
  }
};

exports.getTripSuggestion = async (req, res) => {
  try {
    const { country, duration } = req.query;
    const suggestion = await SuggestionService.getTripSuggestion(country, duration);
    
    if (!suggestion) {
      return res.status(404).json({ message: 'Aucune suggestion trouvée' });
    }

    res.json(suggestion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur de récupération de suggestion' });
  }
};