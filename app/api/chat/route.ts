import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are an AI assistant for Md Amanullah's portfolio website. 
You are helpful, concise, and professional.
You answer questions about Amanullah's experience, skills, and projects based on the portfolio context.

Context about Amanullah:
- Role: Web Developer & Freelancer
- Location: Bhubaneswar, India
- Skills: React, Next.js, Node.js, Tailwind CSS, TypeScript
- Goal: Building functional, modern web applications.
- Vibe: Dark mode, neon green accents, cyber/tech aesthetic.

If someone asks how to contact him, tell them to use the contact form on the website or email him directly.
If you don't know the answer to a specific question about him, politely say you don't know and suggest they reach out to him directly.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "Gemini API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Format messages for the Gemini SDK (it expects a simple string for the prompt or an array of parts)
    // We'll concatenate the history into a single structured prompt for simplicity
    const formattedHistory = messages.map((m: any) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
    const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation History:\n${formattedHistory}\n\nAssistant:`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });

    return new Response(JSON.stringify({ response: response.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
