import { LoaderFunction } from 'react-router-dom';
import { getLessonDetails } from 'services';

export const lessonLoader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  if (id) {
    const response = await getLessonDetails(Number(id));
    return response;
  }
  else return null;
  // throw new Error('Lesson ID is required');
};
