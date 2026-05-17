
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = typeof process !== 'undefined' ? (process.env.API_KEY || process.env.GEMINI_API_KEY) : '';
    this.ai = new GoogleGenAI({ apiKey: apiKey || '' });
    if (!apiKey) {
      console.warn("Gemini API key is missing. AI features will not work.");
    }
  }

  async getEnglishPracticeResponse(userInput: string, chatHistory: any[] = []) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userInput,
        config: {
          systemInstruction: `You are a helpful and encouraging English Practice Bot for students learning English with Masud Sir (মোঃ মাসুদার রহমান) at "Explore English With Masud Sir".

          Your goals are:
          1. English Practice: Correct grammar politely, suggest better vocabulary, and keep conversations engaging. Explain English concepts simply if asked.
          2. Masud Sir Info: If asked about Masud Sir, mention he is a highly experienced English specialist with over 26 years of teaching experience. He is dedicated to helping students build a strong foundation in English.
          3. Contact Details: If asked for contact information, provide:
             - Mobile: 01729104426 or 01913124653
             - Email: masudarrahman019@gmail.com
             - Address: Char Rajibpur, Kurigram.
             - Social: Facebook Page (Explore English With Masud Sir) and YouTube Channel (@ExploreEnglishwithMasudSir).
          4. Courses: If asked about courses, provide details from this list:
             - Class 6: English Grammar & Writing (Free)
             - Class 7: English Grammar & Writing (600 BDT)
             - Class 8: JSC English Preparation (Free)
             - Class 9: Advanced Grammar & Writing (800 BDT)
             - Class 10: SSC English Full Course (1000 BDT)
             - Class 11: HSC English 1st & 2nd Paper (1200 BDT)
             - Class 12: HSC English Final Preparation (1500 BDT)
             Tell them they can enroll directly from the 'Courses' section on this website.
          5. Language: Respond in English primarily for practice, but if the user asks in Bengali or seems to struggle, you can provide explanations in Bengali (Bangla) to help them understand better.
          6. Links: Mention that students can find all courses and free resources (PDFs) in the navigation menu of the website.`,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm sorry, I'm having trouble connecting right now. Let's practice again in a moment!";
    }
  }

  async checkPronunciation(transcript: string) {
    // This would be a more complex implementation in a real app
    // For now, we use Gemini to evaluate text fluency
    const prompt = `Evaluate the following transcript of a student speaking English. Give a score from 1-10 on fluency and suggest 3 improvements: "${transcript}"`;
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  }
}

export const geminiService = new GeminiService();
