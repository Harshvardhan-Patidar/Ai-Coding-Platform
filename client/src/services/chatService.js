import api from './api';

export const chatService = {
  async sendMessage(message, context = '') {
    const response = await api.post('/ai/chat', { message, context });
    return response.data;
  },

  async generateQuestion(topic, difficulty, type) {
    const response = await api.post('/ai/generate-question', {
      topic,
      difficulty,
      type,
    });
    return response.data;
  },

  async analyzeComplexity(code, language) {
    const response = await api.post('/ai/analyze-complexity', {
      code,
      language,
    });
    return response.data;
  },

  async generateTestCases(problemDescription, solution = '') {
    const response = await api.post('/ai/generate-test-cases', {
      problemDescription,
      solution,
    });
    return response.data;
  },

  async getHints(problemDescription, userApproach = '', difficulty) {
    const response = await api.post('/ai/hints', {
      problemDescription,
      userApproach,
      difficulty,
    });
    return response.data;
  },

  async getCodeReview(code, language, problemContext = '') {
    const response = await api.post('/ai/code-review', {
      code,
      language,
      problemContext,
    });
    return response.data;
  },

  async explainAlgorithm(algorithmName, code, language) {
    const response = await api.post('/ai/explain-algorithm', {
      algorithmName,
      code,
      language,
    });
    return response.data;
  },

  async generateStudyPlan(studyData) {
    const response = await api.post('/ai/study-plan', studyData);
    return response.data;
  },

  async voiceInterview(question, userResponse, questionType) {
    const response = await api.post('/ai/voice-interview', {
      question,
      userResponse,
      questionType,
    });
    return response.data;
  },
};
