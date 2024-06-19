import axios from 'axios';
import { config } from '../config';

const API_URL = config.REACT_APP_API_URL;

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
    const response = await apiClient.get('health');
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

export const getLanguages = async () => {
  try {
    const response = await apiClient.get('Languages');
    return response;
  } catch (error) {
    return error;
  }
};

export default apiClient;
