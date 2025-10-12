const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyA7C4anyNxXOUVYN-lshnIAhfIUwFfKy4c';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

class GeminiService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.baseURL = GEMINI_API_URL;
  }

  async generateContent(prompt, options = {}) {
    try {
      const response = await axios.post(
        `${this.baseURL}?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: options.temperature || 0.7,
            topK: options.topK || 40,
            topP: options.topP || 0.95,
            maxOutputTokens: options.maxOutputTokens || 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000
        }
      );

      if (response.data && response.data.candidates && response.data.candidates[0]) {
        return response.data.candidates[0].content.parts[0].text;
      }
      
      throw new Error('Invalid response from Gemini API');
    } catch (error) {
      console.error('Gemini API Error:', error.response?.data || error.message);
      throw new Error('Failed to generate content with Gemini API');
    }
  }

  async debugCode(code, language, errorMessage, testCase) {
    const prompt = `
You are an expert debugging assistant. Analyze the following code and help identify the issue.

Code (${language}):
\`\`\`${language}
${code}
\`\`\`

Error Message: ${errorMessage}
Failed Test Case: ${testCase}

Please provide:
1. A clear explanation of what's wrong
2. The specific line(s) causing the issue
3. A corrected version of the problematic part
4. Tips to avoid similar issues in the future

Be encouraging and educational in your response.
    `;

    return await this.generateContent(prompt, { temperature: 0.3 });
  }

  async explainAlgorithm(algorithm, code) {
    const prompt = `
Explain this algorithm and code in simple terms:

Algorithm: ${algorithm}
Code:
\`\`\`
${code}
\`\`\`

Please provide:
1. What the algorithm does in plain English
2. How it works step by step
3. Time and space complexity
4. When to use this algorithm
5. Common variations or optimizations
    `;

    return await this.generateContent(prompt, { temperature: 0.5 });
  }

  async generateInterviewQuestion(topic, difficulty, type = 'coding') {
    const prompt = `
Generate a ${difficulty} level ${type} interview question about ${topic}.

For coding questions, include:
- Clear problem statement
- Examples with input/output
- Constraints
- Hints for the solution

For behavioral questions, include:
- The question
- What the interviewer is looking for
- Sample good answers
- Common mistakes to avoid

Make it realistic and similar to what you'd see in actual tech interviews.
    `;

    return await this.generateContent(prompt, { temperature: 0.8 });
  }

  async analyzeInterviewResponse(question, userAnswer, questionType) {
    const prompt = `
Analyze this interview response:

Question: ${question}
Question Type: ${questionType}
User Answer: ${userAnswer}

Please provide:
1. Score out of 10
2. Strengths in the response
3. Areas for improvement
4. Specific feedback
5. Suggestions for better answers

Be constructive and helpful in your analysis.
    `;

    return await this.generateContent(prompt, { temperature: 0.4 });
  }

  async generatePersonalizedPlan(weakTopics, strongTopics, currentLevel) {
    const prompt = `
Create a personalized learning plan for a ${currentLevel} level programmer.

Weak Topics: ${weakTopics.join(', ')}
Strong Topics: ${strongTopics.join(', ')}

Please provide:
1. A 4-week learning roadmap
2. Specific resources for each weak topic
3. Practice problems to work on
4. Milestones to track progress
5. Tips for staying motivated

Make it practical and achievable.
    `;

    return await this.generateContent(prompt, { temperature: 0.6 });
  }

  async generateEdgeCases(problemDescription, solution) {
    const prompt = `
Given this problem and solution, generate edge cases that might break the code:

Problem: ${problemDescription}
Solution: ${solution}

Please provide:
1. Edge cases with inputs
2. Expected outputs for each edge case
3. Why each case is important to test
4. Common mistakes these cases catch

Focus on boundary conditions, empty inputs, and unusual data.
    `;

    return await this.generateContent(prompt, { temperature: 0.7 });
  }

  async chatWithUser(message, context = '') {
    const prompt = `
You are a helpful coding assistant for a programming practice platform. 

Context: ${context}
User Message: ${message}

Provide a helpful, accurate, and encouraging response. If the user is asking about coding problems, provide hints rather than complete solutions. If they're asking about concepts, explain clearly with examples.

Keep responses concise but informative.
    `;

    return await this.generateContent(prompt, { temperature: 0.7 });
  }
}

module.exports = new GeminiService();
