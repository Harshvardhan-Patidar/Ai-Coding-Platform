import api from './api';

export const questionService = {
  async getQuestions(params = {}) {
    try {
      // Clean up empty parameters before sending
      const cleanParams = {};
      Object.keys(params).forEach(key => {
        if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
          cleanParams[key] = params[key];
        }
      });

      console.log('Fetching questions with params:', cleanParams);
      const response = await api.get('/questions', { params: cleanParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      
      // Return mock data if API fails for development
      if (error.response?.status === 400 || error.response?.status === 500) {
        console.log('API failed, returning mock data for development');
        return getMockQuestionsData(params);
      }
      
      throw error;
    }
  },

  async getQuestion(id) {
    try {
      const response = await api.get(`/questions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching question:', error);
      
      // Return mock data if API fails for development
      if (error.response?.status === 404 || error.response?.status === 500) {
        console.log('API failed, returning mock question data for development');
        return getMockQuestionData(id);
      }
      
      throw error;
    }
  },

  async submitSolution(id, solutionData) {
    try {
      const response = await api.post(`/questions/${id}/submit`, solutionData);
      return response.data;
    } catch (error) {
      console.error('Error submitting solution:', error);
      throw error;
    }
  },

  async getHints(description, code = '', difficulty = 'medium') {
    try {
      const response = await api.post(`/questions/hints`, {
        description,
        code,
        difficulty
      });
      return response.data;
    } catch (error) {
      console.error('Error getting hints:', error);
      // Return fallback hints if API fails
      return {
        hints: "Think about the problem step by step. Consider edge cases and break down the problem into smaller subproblems. Try to solve the problem manually with examples first."
      };
    }
  },

  async getDebugHelp(id, debugData) {
    try {
      const response = await api.post(`/questions/${id}/debug`, debugData);
      return response.data;
    } catch (error) {
      console.error('Error getting debug help:', error);
      // Return fallback debug help
      return {
        debugHelp: "Debug help is currently unavailable. Please check your code for syntax errors, variable naming consistency, proper return statements, and edge case handling."
      };
    }
  },

  async explainAlgorithm(algorithm, code, language) {
    try {
      const response = await api.post('/questions/explain-algorithm', {
        algorithm,
        code,
        language
      });
      return response.data;
    } catch (error) {
      console.error('Error getting algorithm explanation:', error);
      throw error;
    }
  },

  async getEdgeCases(id) {
    try {
      const response = await api.get(`/questions/${id}/edge-cases`);
      return response.data;
    } catch (error) {
      console.error('Error getting edge cases:', error);
      throw error;
    }
  },

  async getFilters() {
    try {
      const response = await api.get('/questions/meta/filters');
      return response.data;
    } catch (error) {
      console.error('Error fetching filters:', error);
      // Return fallback filters if API fails
      return getMockFilterData();
    }
  }
};

// Mock data fallbacks for development
function getMockQuestionsData(params) {
  console.log('Using mock questions data with params:', params);
  
  const allMockQuestions = [
    {
      _id: '1',
      title: 'Two Sum',
      description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
      difficulty: 'easy',
      topics: ['Array', 'Hash Table'],
      companies: ['Google', 'Amazon', 'Facebook'],
      acceptanceRate: 45,
      averageTime: 15,
      isSolved: false,
      createdAt: new Date('2023-01-15')
    },
    {
      _id: '2',
      title: 'Reverse String',
      description: 'Write a function that reverses a string. The input string is given as an array of characters.',
      difficulty: 'easy',
      topics: ['String', 'Two Pointers'],
      companies: ['Microsoft', 'Apple'],
      acceptanceRate: 78,
      averageTime: 10,
      isSolved: true,
      createdAt: new Date('2023-02-20')
    },
    {
      _id: '3',
      title: 'Valid Parentheses',
      description: 'Given a string containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
      difficulty: 'easy',
      topics: ['String', 'Stack'],
      companies: ['Google', 'Amazon', 'Microsoft'],
      acceptanceRate: 62,
      averageTime: 12,
      isSolved: false,
      createdAt: new Date('2023-03-10')
    },
    {
      _id: '4',
      title: 'Merge Two Sorted Lists',
      description: 'Merge two sorted linked lists and return it as a sorted list.',
      difficulty: 'easy',
      topics: ['Linked List', 'Recursion'],
      companies: ['Amazon', 'Microsoft', 'Facebook'],
      acceptanceRate: 55,
      averageTime: 20,
      isSolved: false,
      createdAt: new Date('2023-04-05')
    },
    {
      _id: '5',
      title: 'Best Time to Buy and Sell Stock',
      description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve.',
      difficulty: 'easy',
      topics: ['Array', 'Dynamic Programming'],
      companies: ['Amazon', 'Microsoft', 'Bloomberg'],
      acceptanceRate: 51,
      averageTime: 18,
      isSolved: true,
      createdAt: new Date('2023-05-12')
    },
    {
      _id: '6',
      title: 'Binary Tree Inorder Traversal',
      description: 'Given the root of a binary tree, return the inorder traversal of its nodes values.',
      difficulty: 'easy',
      topics: ['Tree', 'Stack', 'Depth-First Search'],
      companies: ['Google', 'Amazon', 'Microsoft'],
      acceptanceRate: 67,
      averageTime: 15,
      isSolved: false,
      createdAt: new Date('2023-06-18')
    }
  ];

  // Filter based on params
  let filteredQuestions = [...allMockQuestions];
  
  if (params.difficulty) {
    filteredQuestions = filteredQuestions.filter(q => q.difficulty === params.difficulty);
  }
  
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredQuestions = filteredQuestions.filter(q => 
      q.title.toLowerCase().includes(searchLower) ||
      q.description.toLowerCase().includes(searchLower) ||
      q.topics.some(topic => topic.toLowerCase().includes(searchLower))
    );
  }
  
  if (params.topic) {
    filteredQuestions = filteredQuestions.filter(q => 
      q.topics.some(topic => topic.toLowerCase().includes(params.topic.toLowerCase()))
    );
  }

  // Sort based on params
  if (params.sort === 'newest') {
    filteredQuestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (params.sort === 'oldest') {
    filteredQuestions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (params.sort === 'difficulty') {
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
    filteredQuestions.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
  } else if (params.sort === 'acceptance') {
    filteredQuestions.sort((a, b) => b.acceptanceRate - a.acceptanceRate);
  }

  // Pagination
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex);

  return {
    questions: paginatedQuestions,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredQuestions.length / limit),
      totalQuestions: filteredQuestions.length,
      hasNext: endIndex < filteredQuestions.length,
      hasPrev: page > 1
    }
  };
}

function getMockQuestionData(id) {
  const mockQuestions = {
    '1': {
      _id: '1',
      title: 'Two Sum',
      description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
      difficulty: 'easy',
      topics: ['Array', 'Hash Table'],
      companies: ['Google', 'Amazon', 'Facebook'],
      acceptanceRate: 45,
      averageTime: 15,
      isSolved: false,
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
        }
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.'
      ]
    },
    '2': {
      _id: '2',
      title: 'Reverse String',
      description: 'Write a function that reverses a string. The input string is given as an array of characters. You must do this by modifying the input array in-place with O(1) extra memory.',
      difficulty: 'easy',
      topics: ['String', 'Two Pointers'],
      companies: ['Microsoft', 'Apple'],
      acceptanceRate: 78,
      averageTime: 10,
      isSolved: true,
      examples: [
        {
          input: '["h","e","l","l","o"]',
          output: '["o","l","l","e","h"]',
          explanation: 'The string "hello" reversed is "olleh".'
        }
      ],
      constraints: [
        '1 <= s.length <= 10^5',
        's[i] is a printable ascii character.'
      ]
    }
  };

  return {
    question: mockQuestions[id] || mockQuestions['1']
  };
}

function getMockFilterData() {
  return {
    topics: ['Array', 'String', 'Hash Table', 'Linked List', 'Tree', 'Graph', 'Dynamic Programming', 'Backtracking', 'Stack', 'Queue', 'Heap', 'Sorting', 'Searching', 'Recursion', 'Bit Manipulation'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Netflix', 'Uber', 'Airbnb', 'Twitter', 'LinkedIn']
  };
}