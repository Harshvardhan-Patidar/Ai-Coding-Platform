const axios = require('axios');
const fs = require('fs');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyA7C4anyNxXOUVYN-lshnIAhfIUwFfKy4c';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

/**
 * Convert speech audio into text using Gemini API
 * @param {string} filePath - path of uploaded audio file
 * @param {string} mimeType - mime type (e.g., 'audio/webm')
 * @returns {Promise<string>} transcribed text
 */

class GeminiService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.baseURL = GEMINI_API_URL;
  }

  async generateContent(prompt, options = {}) {
    try {
      console.log('Sending request to Gemini API...');
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
            maxOutputTokens: options.maxOutputTokens || 4000 ,
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
          timeout: 45000
        }
      );

       console.log('Gemini API Response:', JSON.stringify(response.data, null, 2));

       // FIXED: Handle the actual response structure from Gemini 2.5 Flash
      const candidate = response.data.candidates?.[0];
      
      if (!candidate) {
        console.error('No candidates in response');
        throw new Error('No response generated');
      }

      // Check for finish reasons that indicate no content
      if (candidate.finishReason === 'MAX_TOKENS') {
        console.warn('Response truncated due to token limit');
        // Return a meaningful message instead of throwing error
        return 'The response was too long and got truncated. Please try with a shorter prompt or ask for more specific information.';
      }

      if (candidate.finishReason === 'SAFETY') {
        console.warn('Response blocked for safety reasons');
        return 'The response was blocked for safety reasons. Please rephrase your request.';
      }

      if (candidate.finishReason === 'OTHER' || candidate.finishReason === 'STOP') {
        console.warn('Response finished with reason:', candidate.finishReason);
      }

      // Extract text content - handle different possible structures
      let text = '';
      
      if (candidate.content?.parts?.[0]?.text) {
        text = candidate.content.parts[0].text;
      } else if (candidate.content?.text) {
        text = candidate.content.text;
      } else if (candidate.text) {
        text = candidate.text;
      } else {
        console.warn('No text content found in response, using fallback');
        text = 'I received your request but could not generate a proper response. This might be due to content filters or technical limitations. Please try rephrasing your question.';
      }

      console.log('Extracted text length:', text.length);
      return text;

    } catch (error) {
      console.error('Gemini API Error Details:', {
         message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code
      });

      // Provide fallback responses based on error type
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      } else if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your Gemini API configuration.');
      } else if (error.response?.status === 404) {
        throw new Error('API endpoint not found. Please check the API URL.');
      } else if (error.response?.status >= 500) {
        throw new Error('AI service temporarily unavailable. Please try again later.');
      } else {
        throw new Error(`Failed to generate content: ${error.response?.data?.error?.message || error.message}`);
      }
    }
  }

  async transcribeAudio(filePath, mimeType = 'audio/webm') {
  try {
    const audioData = fs.readFileSync(filePath);
    const base64Audio = audioData.toString('base64');

    const payload = {
      contents: [
        {
          parts: [
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Audio,
              },
            },
            {
              text: 'Transcribe this spoken audio accurately into plain text.',
            },
          ],
        },
      ],
    };

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      payload,
      { headers: { 'Content-Type': 'application/json' },
      timeout: 30000
     }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Transcription failed';

    return text;
  } catch (error) {
    console.error('❌ Gemini transcription error:', error.response?.data || error.message);
    throw new Error('Failed to transcribe audio');
  }
};

  async debugCode(code, language, errorMessage, testCase) {
    const prompt = `
You are an expert debugging assistant. Analyze the following code and help identify the issue.

Code (${language}):
\`\`\`${language}
${code}
\`\`\`

Error Message: ${errorMessage}
Failed Test Case: ${testCase}

Please provide a comprehensive debugging analysis including:
1. Root cause analysis of the error
2. Specific line numbers or code sections causing issues
3. explanation of what's going wrong

Give a short and concise response.
    `;

    return await this.generateContent(prompt, { temperature: 0.6, maxOutputTokens: 4000 });
  }

  async explainAlgorithm(algorithm, code) {
    const prompt = `
Explain this algorithm and code in simple terms:

Algorithm: ${algorithm}
Code:
\`\`\`
${code}
\`\`\`

Please explain in detail:
1. Please explain what the algorithm does, its uses, how it works step-by-step, its time/space complexity, its strengths and weaknesses, and alternative methods with trade-offs.

give the short and concise response.
    `;

    return await this.generateContent(prompt, { temperature: 0.6, maxOutputTokens: 4000 });
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
1. Overall score (0-10) with justification
2. Strengths demonstrated in the response
3. Specific areas for improvement
4. Technical accuracy assessment
5. Communication effectiveness
6. Problem-solving approach evaluation
7. Comparison to expected answer
8. Concrete suggestions for improvement
9. Follow-up questions the interviewer might ask

Be constructive, fair, and provide actionable feedback.
    `;

    return await this.generateContent(prompt, { temperature: 0.4 });
  }

  async generatePersonalizedPlan(weakTopics, strongTopics, currentLevel) {
    const prompt = `
Create a personalized learning plan for a ${currentLevel} level programmer.

Weak Topics: ${weakTopics.join(', ')}
Strong Topics: ${strongTopics.join(', ')}

Design a comprehensive learning roadmap that:
1. Systematically addresses weak areas while reinforcing strengths
2. Includes specific learning resources and practice materials
3. Provides milestone-based progress tracking
4. Incorporates practical projects and coding exercises
5. Includes interview preparation strategies
6. Offers time management and study techniques
7. Suggests community engagement and peer learning opportunities

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
1. Boundary value test cases
2. Stress/performance test cases  
3. Invalid input test cases
4. Edge cases that test specific constraints
5. Random but relevant test cases
6. For each test case, provide:
   - Input values
   - Expected output
   - Why this case is important
   - Common mistakes this case catches

Focus on boundary conditions, empty inputs, and unusual data.
    `;

    return await this.generateContent(prompt, { temperature: 0.7 });
  }

  async chatWithUser(message, context = '') {
    const prompt = `
You are a helpful coding assistant for a programming practice platform. 

Context: ${context}
User Message: ${message}

Provide a helpful, accurate, and encouraging response. Follow these guidelines:
- If it's a coding problem, provide hints and guidance rather than complete solutions
- If it's a concept question, explain clearly with examples
- If you're unsure, admit it and suggest resources
- Keep responses informative but concise
- Be encouraging and supportive
- Focus on educational value

Always prioritize helping the user learn and understand rather than just giving answers.
    `;

    return await this.generateContent(prompt, { temperature: 0.7 });
  }

  async getHints(description, code, difficulty) {
   const prompt = `
   Provide helpful hints for this ${difficulty} level coding problem:
   
   Problem: ${description}
   User's Current Approach: ${code || 'No approach provided yet'}
   
   Please provide progressive hints that guide without giving away the solution:
   1. Start with general problem-solving approaches
   2. Suggest key concepts and data structures to consider
   
   Structure your response in points, dont make it to long give a to the points answers.
       `;

    return await this.generateContent(prompt, { 
      temperature: 0.6,
      maxOutputTokens: 4000 
    });
  }
}

module.exports = new GeminiService();
