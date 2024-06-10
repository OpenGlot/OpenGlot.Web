import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface Question {
  targetLanguage: string;
  meaning: string;
}

export interface User {
  name: string;
  profile: string;
}

// Axios instance with credentials
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const response = await axiosInstance.get('/questions/random-question');
    return response.data.data.pairs;
  } catch (error) {
    throw new Error('Fetch questions failed');
  }
};

export const checkAuthStatus = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get('/users/check-auth');
    return response.data.data;
  } catch (error) {
    throw new Error('Auth check failed');
  }
};
