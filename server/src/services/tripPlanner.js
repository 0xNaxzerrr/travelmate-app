const OpenAI = require('openai');
const crypto = require('crypto');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.generateTripPlan = async (country, duration) => {
  const prompt = `Plan a ${duration} day trip to ${country}. Include:
  1. Cities to visit with number of days for each
  2. Main activities in each city
  3. Essential items to pack based on activities and location
  Format the response as a JSON object with the following structure:
  {
    "destinations": [{"city": string, "days": number, "activities": string[]}],
    "equipment": string[]
  }`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a travel expert who provides detailed trip itineraries." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating trip plan:', error);
    throw new Error('Failed to generate trip plan');
  }
};

exports.generateShareLink = () => {
  return crypto.randomBytes(8).toString('hex');
};