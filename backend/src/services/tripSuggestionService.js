const OpenAI = require('openai');
const TripSuggestion = require('../models/TripSuggestion');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class TripSuggestionService {
  static async generateTripSuggestion(country, duration) {
    try {
      const prompt = `Génère un itinéraire de voyage détaillé pour ${duration} jours en ${country}. 
      Inclure : 
      - Liste des villes à visiter
      - Nombre de jours par ville
      - Activités principales
      - Équipement recommandé
      Format : JSON strict`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }]
      });

      const suggestion = JSON.parse(response.choices[0].message.content);

      const tripSuggestion = new TripSuggestion({
        country,
        duration,
        destinations: suggestion.destinations,
        recommendedEquipment: suggestion.recommendedEquipment
      });

      await tripSuggestion.save();

      return tripSuggestion;
    } catch (error) {
      console.error('Erreur de génération de suggestion:', error);
      throw error;
    }
  }

  static async getTripSuggestion(country, duration) {
    return TripSuggestion.findOne({ country, duration });
  }
}

module.exports = TripSuggestionService;