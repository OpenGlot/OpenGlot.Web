import axios from 'axios';

const API_URL = 'http://localhost:5270';

export interface Question {
  targetLanguage: string;
  meaning: string;
}

export interface User {
  name: string;
  profile: string;
}

// Axios instance with credentials
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const response = await apiClient.get('/questions/random-question');
    return response.data.data.pairs;
  } catch (error) {
    throw new Error('Fetch questions failed');
  }
};

export const checkHealth = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/health');
    return response;
  } catch (error) {
    return error;
  }
};

export default apiClient;
