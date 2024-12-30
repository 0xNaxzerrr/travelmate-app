import { OpenAI } from 'openai';
import { config } from '../config';
import { ICity } from '../interfaces/ILocation';
import { IEquipment } from '../interfaces/ITrip';

interface IGeneratedItinerary {
  cities: ICity[];
  recommendations: {
    equipment: IEquipment[];
  };
}

export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openai.apiKey
    });
  }

  async generateItinerary(country: string, duration: number): Promise<IGeneratedItinerary> {
    try {
      const prompt = `Create a detailed ${duration} day travel itinerary for ${country} including:
      - Cities to visit with duration for each
      - Must-see attractions and activities
      - Recommended equipment and items to bring
      Follow this exact JSON format:
      {
        "cities": [{
          "name": "city name",
          "duration": number of days,
          "coordinates": { "latitude": number, "longitude": number },
          "activities": ["activity1", "activity2"]
        }],
        "recommendations": {
          "equipment": [{
            "item": "item name",
            "reason": "why it's needed",
            "priority": "high/medium/low"
          }]
        }
      }`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert travel planner. Provide accurate and detailed travel recommendations.'
          },
          { role: 'user', content: prompt }
        ]
      });

      const response = JSON.parse(
        completion.choices[0].message?.content || '{}'
      );

      return this.validateAndFormatResponse(response);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      throw new Error('Failed to generate travel itinerary');
    }
  }

  private validateAndFormatResponse(response: any): IGeneratedItinerary {
    if (!response.cities || !Array.isArray(response.cities)) {
      throw new Error('Invalid itinerary format: missing or invalid cities');
    }

    return {
      cities: response.cities.map((city: any) => ({
        name: city.name,
        coordinates: {
          latitude: Number(city.coordinates.latitude),
          longitude: Number(city.coordinates.longitude)
        },
        duration: Number(city.duration),
        activities: Array.isArray(city.activities) ? city.activities : []
      })),
      recommendations: {
        equipment: (response.recommendations?.equipment || []).map((item: any) => ({
          item: item.item,
          reason: item.reason,
          priority: item.priority || 'medium'
        }))
      }
    };
  }
}