
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PORTFOLIO_DATA } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for ${PORTFOLIO_DATA.name}'s professional portfolio. 
Your goal is to answer questions from visitors about Alex's skills, experience, and projects.

Alex is a ${PORTFOLIO_DATA.role} based in ${PORTFOLIO_DATA.location}.
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
4. If asked something unrelated to Alex or their portfolio, gently steer the conversation back to their professional profile.
5. Use a tone that matches a modern, high-tech portfolio.
`;

export async function askPortfolioAI(message: string, history: { role: 'user' | 'assistant', content: string }[]): Promise<string> {
  try {
    const contents = [
      ...history.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 500,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm having trouble connecting to my AI core. Please try again later!";
  }
}
