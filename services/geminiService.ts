
import { GoogleGenAI, GenerateContentResponse, Content } from "@google/genai";
import { Message } from "../types";
import { PORTFOLIO_DATA } from "../constants";

// Always initialize with the direct apiKey from process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for ${PORTFOLIO_DATA.name}'s professional portfolio. 
Your goal is to answer questions from visitors about ${PORTFOLIO_DATA.name}'s skills, experience, and projects.

${PORTFOLIO_DATA.name} is a ${PORTFOLIO_DATA.role} based in ${PORTFOLIO_DATA.location}.
Bio: ${PORTFOLIO_DATA.bio}

Detailed Experience:
${PORTFOLIO_DATA.experience.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}

Key Projects:
${PORTFOLIO_DATA.projects.map(p => `- ${p.title}: ${p.description}. Tech: ${p.tags.join(', ')}`).join('\n')}

Key Skills:
${PORTFOLIO_DATA.skills.map(s => `- ${s.category}: ${s.items.join(', ')}`).join('\n')}

Guidelines:
1. Be professional, friendly, and helpful.
2. If someone asks for contact info, provide ${PORTFOLIO_DATA.email}.
3. Keep responses concise and focused on the portfolio content.
4. If asked something unrelated to the portfolio, gently steer the conversation back to their professional profile.
5. Use a tone that matches a modern, high-tech portfolio.
`;

export async function askPortfolioAI(message: string, history: Message[]): Promise<string> {
  try {
    // Correctly mapping history to the expected Content structure for the SDK
    const contents: Content[] = [
      ...history.map(m => ({
        role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.content }]
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    // Using ai.models.generateContent to query GenAI with model name and prompt/contents
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    // Access the extracted string output using the .text property (not a method)
    return response.text || "I'm sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm having trouble connecting to my AI core. Please try again later!";
  }
}
