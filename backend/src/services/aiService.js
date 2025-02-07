import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/index.js';

class AIService {
  constructor() {
    if (!config.googleApiKey) {
      throw new Error('Google API key is not configured');
    }
    this.genAI = new GoogleGenerativeAI(config.googleApiKey);
  }

  async generateCode(prompt) {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Enhanced prompt for better code generation
      const enhancedPrompt = `Generate clean, well-documented code for the following request. Include:
      - Code implementation
      - Brief documentation
      - Usage examples
      
      Request: ${prompt}`;

      const result = await model.generateContent(enhancedPrompt);
      const response = await result.response;
      const text = response.text();

      // Parse the response
      const codeMatch = text.match(/```[\s\S]*?```/);
      const code = codeMatch
        ? codeMatch[0].replace(/```[\w]*\n?|```/g, '')
        : text;
      const documentation = text.replace(/```[\s\S]*?```/g, '').trim();

      return {
        generatedCode: code,
        documentation,
        executionResults: 'Code generated successfully',
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate code: ' + error.message);
    }
  }
}

export const aiService = new AIService();
