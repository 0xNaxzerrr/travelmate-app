import { Configuration, OpenAIApi } from 'openai';
import { config } from '../config';
import { ICity } from '../interfaces/ILocation';

export class OpenAIService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: config.openai.apiKey
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generateItinerary(country: string, duration: number) {
    const prompt = `Create a ${duration} day travel itinerary for ${country} including:
    - Cities to visit with duration for each
    - Must-see attractions and activities
    - Recommended equipment and items to bring
    Format as JSON.`;

    const completion = await this.openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a travel expert.' },
        { role: 'user', content: prompt }
      ]
    });

    const response = JSON.parse(
      completion.data.choices[0].message?.content || '{}'
    );

    return this.formatItinerary(response);
  }

  private formatItinerary(rawResponse: any) {
    return {
      cities: rawResponse.cities.map((city: any): ICity => ({
        name: city.name,
        country: city.country,
        coordinates: city.coordinates,
        duration: city.duration,
        activities: city.activities
      })),
      recommendations: {
        equipment: rawResponse.equipment.map((item: any) => ({
          item: item.name,
          reason: item.reason,
          priority: item.priority
        }))
      }
    };
  }
}