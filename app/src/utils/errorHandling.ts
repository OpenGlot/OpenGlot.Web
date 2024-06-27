export const withAsyncErrorHandling = <T>(
  asyncFunc: (...args: any[]) => Promise<T>
) => {
  return async (...args: any[]): Promise<T | null> => {
    try {
      return await asyncFunc(...args);
    } catch (error) {
      alert('Error fetching data');
      console.error('Error fetching data', error);
      return null;
    }
  };
};
