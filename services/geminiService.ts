
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Creating the AI instance inside the function to ensure it always uses the most up-to-date API key.
export async function analyzeRumor(content: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this health-related rumor from Uganda and provide a structured response: "${content}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { 
              type: Type.STRING, 
              description: "Must be 'harmful', 'unclear', or 'verified'" 
            },
            category: { 
              type: Type.STRING, 
              description: "Must be one of: Vaccines, HIV, Malaria, Pregnancy, Mental Health, NCDs, Other" 
            },
            riskScore: { 
              type: Type.INTEGER, 
              description: "A number between 0 and 100 representing the potential danger" 
            },
            explainer: { 
              type: Type.STRING, 
              description: "A concise myth-vs-fact explanation (English)" 
            },
            translation: { 
              type: Type.STRING, 
              description: "The explainer translated into Luganda" 
            }
          },
          required: ["status", "category", "riskScore", "explainer", "translation"]
        }
      }
    });

    // Fix: Use the .text property directly instead of text().
    const jsonStr = response.text;
    if (!jsonStr) {
      console.warn("Gemini returned an empty response.");
      return null;
    }
    
    return JSON.parse(jsonStr.trim());
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
}
