import axios from 'axios';
import { config } from '../config';
import { Language } from '../features/languages/language';
import { Module } from '../features/modules/module';
import { Course } from '../features/courses/course';
import { Lesson } from '../features/lessons/lesson';
import { getTokens } from '../utils/storeGetTokens';

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
    return response;
  } catch (error) {
    return error;
  }
};

export const getLanguages = async (): Promise<Language[]> => {
  try {
    const response = await apiClient.get('Languages');
    return response.data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
};

export const getLanguageDetails = async (id: number): Promise<Language> => {
  try {
    const response = await apiClient.get(`Languages/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching language details:', error);
    throw new Error('Failed to fetch language details');
  }
};

export const getModules = async (): Promise<Module[]> => {
  try {
    const response = await apiClient.get('Modules');
    return response.data;
  } catch (error) {
    console.error('Error fetching modules:', error);
    return [];
  }
};

export const getModuleDetails = async (id: number): Promise<Module> => {
  try {
    const response = await apiClient.get(`Modules/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching module details:', error);
    throw new Error('Failed to fetch module details');
  }
};

export const getCourses = async (): Promise<Course[]> => {
  try {
    const response = await apiClient.get('Courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

export const getCourseDetails = async (id: number): Promise<Course> => {
  try {
    const response = await apiClient.get(`Courses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw new Error('Failed to fetch course details');
  }
};

export const getLessons = async (): Promise<Lesson[]> => {
  const { idToken } = await getTokens();
  try {
    const response = await apiClient.get('Lessons', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
};

export const getLessonDetails = async (id: number): Promise<Lesson> => {
  const { idToken } = await getTokens();
  try {
    const response = await apiClient.get(`Lessons/${id}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching lesson details:', error);
    throw new Error('Failed to fetch lesson details');
  }
};

export default apiClient;
