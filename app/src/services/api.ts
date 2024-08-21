import axios from 'axios';
import { config } from '../config';
import { Language, Module, Course, Lesson, Question, User } from 'types';
import { getTokens, withAsyncErrorHandling } from 'utils';

const API_URL = config.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
});

const createAuthConfig = () => {
  const { idToken } = getTokens();
  return {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  };
};

export const checkHealth = withAsyncErrorHandling(async () => {
  const response = await apiClient.get('health');
  return response.data;
});

export const fetchQuestions = withAsyncErrorHandling(
  async (): Promise<Question[]> => {
    const response = await apiClient.get('/questions/random-question');
    return response.data.data.pairs;
  }
);

export const getLanguages = withAsyncErrorHandling(
  async (): Promise<Language[]> => {
    const response = await apiClient.get('Languages', createAuthConfig());
    return response.data;
  }
);

export const getLanguageDetails = withAsyncErrorHandling(
  async (id: number): Promise<Language> => {
    const response = await apiClient.get(`Languages/${id}`, createAuthConfig());
    return response.data;
  }
);

export const getModules = withAsyncErrorHandling(
  async (): Promise<Module[]> => {
    const response = await apiClient.get('Modules', createAuthConfig());
    return response.data;
  }
);

export const getModuleDetails = withAsyncErrorHandling(
  async (id: number): Promise<Module> => {
    const response = await apiClient.get(`Modules/${id}`, createAuthConfig());
    return response.data;
  }
);

export const getCourses = withAsyncErrorHandling(
  async (): Promise<Course[]> => {
    const response = await apiClient.get('Courses', createAuthConfig());
    return response.data;
  }
);

export const getCourseDetails = withAsyncErrorHandling(
  async (id: number): Promise<Course> => {
    const response = await apiClient.get(`Courses/${id}`, createAuthConfig());
    return response.data;
  }
);

export const getLessons = withAsyncErrorHandling(
  async (): Promise<Lesson[]> => {
    const response = await apiClient.get('Lessons', createAuthConfig());
    return response.data;
  }
);

export const getLessonDetails = withAsyncErrorHandling(
  async (id: number): Promise<Lesson> => {
    const response = await apiClient.get(`Lessons/${id}`, createAuthConfig());
    return response.data;
  }
);

export const getImages = withAsyncErrorHandling(async (): Promise<Lesson[]> => {
  const response = await apiClient.get('Files/images', createAuthConfig());
  return response.data;
});

export const getImageDetails = withAsyncErrorHandling(
  async (searchText: string | null): Promise<Lesson> => {
    const query = searchText ? searchText : null;
    const response = await apiClient.get(
      `Files/search/images/${query}`,
      createAuthConfig()
    );
    return response.data;
  }
);

export const getAudios = withAsyncErrorHandling(async (): Promise<Lesson[]> => {
  const response = await apiClient.get('Files/audios', createAuthConfig());
  return response.data;
});

export const getAudioDetails = withAsyncErrorHandling(
  async (searchText: string): Promise<Lesson> => {
    const response = await apiClient.get(
      `Files/search/audios/${searchText}`,
      createAuthConfig()
    );
    return response.data;
  }
);

// Reusable upload file function
export const handleUploadFiles = withAsyncErrorHandling(
  async (files: File[], uploadEndpoint: string) => {
    const formData = new FormData();

    // Append each file to the FormData with the key 'file'
    files.forEach((file) => {
      formData.append('file', file); // Ensure the key 'file' matches your backend's expected field name
    });

    try {
      const response = await apiClient.post(
        `/Files${uploadEndpoint}`,
        formData,
        createAuthConfig()
      );
      return response.data;
    } catch (error) {
      console.error(`Error uploading files to ${uploadEndpoint}:`, error);
      throw new Error(`Failed to upload files.`);
    }
  }
);

// update the lesson
export const updateLesson = withAsyncErrorHandling(
  async (lessonData: Partial<Lesson>): Promise<Lesson> => {
    console.log(lessonData, 'lessonData');
    try {
      if (!lessonData.id) {
        throw new Error('Lesson ID is required for updating');
      }
      const response = await apiClient.put(
        `Lessons/${lessonData.id}`,
        lessonData,
        createAuthConfig()
      );
      return response.data;
    } catch (error: any) {
      // Handle server validation errors
      if (error.response && error.response.status === 400) {
        console.error('Validation error:', error.response.data);
        throw new Error(
          'Validation error: ' + JSON.stringify(error.response.data)
        );
      } else {
        console.error('Error updating lesson:', error);
        throw new Error(
          'An unexpected error occurred while updating the lesson.'
        );
      }
    }
  }
);

// create the lesson
export const createLesson = withAsyncErrorHandling(
  async (lessonData: Partial<Lesson>): Promise<Lesson> => {
    console.log(lessonData, 'lessonData');
    try {
      const response = await apiClient.post(
        'Lessons',
        lessonData,
        createAuthConfig()
      );
      return response.data;
    } catch (error: any) {
      // Handle server validation errors
      if (error.response && error.response.status === 400) {
        console.error('Validation error:', error.response.data);
        throw new Error(
          'Validation error: ' + JSON.stringify(error.response.data)
        );
      } else {
        console.error('Error creating lesson:', error);
        throw new Error(
          'An unexpected error occurred while creating the lesson.'
        );
      }
    }
  }
);

export const getUserDetails = withAsyncErrorHandling(
  async (id: string): Promise<User> => {
    const response = await apiClient.get(`users/${id}`, createAuthConfig());
    return response.data;
  }
);

export const checkRegisterState = async () => {
  try {
    const response = await apiClient.post(
      'users/login',
      {},
      createAuthConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Error checking registration state:', error);
    throw error; // Re-throw the error to be handled elsewhere
  }
};

export default apiClient;
