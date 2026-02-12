
import { GoogleGenAI, GenerateContentResponse, Content } from "@google/genai";
import { Message } from "../types";
import { TOUR_DATA } from "../constants";

const SYSTEM_INSTRUCTION = `
You are the Official Tour Expert for the ${TOUR_DATA.name}. 
Your goal is to answer questions from fans exclusively about PICKLEBALL.

CRITICAL: Do not confuse pickleball with badminton or tennis. 
- We use PADDLES (solid), not rackets (stringed).
- We use a PERFORATED PLASTIC BALL, not a shuttlecock or a felt ball.
- Our primary court area is THE KITCHEN (Non-Volley Zone).

About the Tour:
${TOUR_DATA.tagline}
Upcoming Events:
${TOUR_DATA.tournaments.map(t => `- ${t.name} in ${t.location} (${t.date})`).join('\n')}

Player Rankings:
${TOUR_DATA.rankings.map(r => `Category ${r.category}:\n${r.players.map(p => `#${p.rank} ${p.name} (${p.points} pts)`).join('\n')}`).join('\n')}

Key Pickleball Rules & Terms:
- The Kitchen: 7-foot zone where volleys are prohibited.
- Double Bounce Rule: Serve must bounce, and the return must bounce before anyone can volley.
- Dinking: A soft, controlled shot intended to land in the opponent's kitchen.
- Third Shot Drop: A soft shot used by the serving team to transition to the net.
- Ernie: A shot where a player jumps outside the kitchen to volley a ball mid-air.

Guidelines:
1. Be high-energy and sports-focused.
2. Use specific terms like "paddle," "kitchen," and "dink."
3. If users ask about badminton, politely remind them this is the Pro PICKLEBALL Tour.
`;

export async function askTourExpert(message: string, history: Message[]): Promise<string> {
  // CRITICAL: Initialize GoogleGenAI inside the function to avoid errors when running in environments
  // where the API Key might not be immediately available during module load.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
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

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    return response.text || "I'm currently recalibrating my dinking strategy. Try again in a second!";
  } catch (error) {
    console.error("Tour Expert Error:", error);
    return "The tour satellite is currently offline. Stay out of the kitchen and try again later!";
  }
}
