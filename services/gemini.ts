
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Always initialize GoogleGenAI with a named parameter using process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askConcierge = async (prompt: string, items: any[]) => {
  try {
    // Fix: Use generateContent directly. For simple text prompts, contents can be a string.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the UniBorrow AI Concierge. Help students find the best rental gear for their needs on our university campus marketplace.
          Available Items: ${JSON.stringify(items.map(i => ({ name: i.name, category: i.category, fee: i.feePerDay })))}
          User Question: ${prompt}
          Provide a helpful, friendly response recommending specific items or categories. Note that all prices are in Pesos (₱).`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    // Fix: Use response.text property directly (not a method).
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my AI brain. Try searching the categories above!";
  }
};

export const suggestDescription = async (itemName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a catchy, short, and professional rental description for a "${itemName}" listed on "UniBorrow", a university campus marketplace. Focus on student needs.`,
      config: {
        maxOutputTokens: 100,
      }
    });
    // Fix: Use response.text property directly.
    return response.text;
  } catch (error) {
    return "A high-quality item perfect for campus life.";
  }
};
