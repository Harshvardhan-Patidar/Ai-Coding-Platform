import api from './api';

export const questionService = {
  async getQuestions(params = {}) {
    const response = await api.get('/questions', { params });
    return response.data;
  },

  async getQuestion(id) {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  },

  async submitSolution(id, solutionData) {
    const response = await api.post(`/questions/${id}/submit`, solutionData);
    return response.data;
  },

  async getDebugHelp(id, debugData) {
    const response = await api.post(`/questions/${id}/debug`, debugData);
    return response.data;
  },

  async getExplanation(id, explanationData) {
    const response = await api.post(`/questions/${id}/explain`, explanationData);
    return response.data;
  },

  async getEdgeCases(id) {
    const response = await api.get(`/questions/${id}/edge-cases`);
    return response.data;
  },

  async getFilters() {
    const response = await api.get('/questions/meta/filters');
    return response.data;
  },
};
