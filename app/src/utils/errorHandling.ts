import axios from 'axios';

export const withAsyncErrorHandling = <T>(
  asyncFunc: (...args: any[]) => Promise<T>
) => {
  return async (...args: any[]): Promise<T | null> => {
    try {
      return await asyncFunc(...args);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert('You are not authorized to access this resource');
          return null;
        }
        console.error('Error fetching data', error);
        // alert('Error fetching data');
        return null;
      }

      console.error('An unexpected error occurred', error);
      alert('An unexpected error occurred');
      return null;
    }
  };
};
