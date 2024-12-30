const OpenAI = require('openai');
const logger = require('../config/logger');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateItinerary = async (country, duration) => {
  try {
    const prompt = `En tant qu'expert du voyage, crée un itinéraire détaillé pour un voyage de ${duration} jours en ${country}. 
Include pour chaque ville:
- Le nom de la ville
- La durée recommandée du séjour
- Les coordonnées GPS
- Les activités recommandées

Format de réponse en JSON:
{
  "cities": [{
    "name": "nom_ville",
    "duration": nombre_jours,
    "coordinates": {"latitude": xx.xxx, "longitude": xx.xxx},
    "activities": ["activité 1", "activité 2"]
  }],
  "equipment": [{
    "item": "nom_équipement",
    "reason": "raison",
    "priority": "high/medium/low"
  }]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en voyages qui crée des itinéraires détaillés."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    });

    const suggestion = JSON.parse(response.choices[0].message.content);
    return suggestion;
  } catch (error) {
    logger.error('Erreur lors de la génération de l\'itinéraire:', error);
    throw new Error('Impossible de générer l\'itinéraire');
  }
};

const validateItinerary = (itinerary, duration) => {
  const totalDays = itinerary.cities.reduce((sum, city) => sum + city.duration, 0);
  if (totalDays > duration) {
    throw new Error(`L'itinéraire total (${totalDays} jours) dépasse la durée demandée (${duration} jours)`);
  }
};

module.exports = {
  generateItinerary,
  validateItinerary
};