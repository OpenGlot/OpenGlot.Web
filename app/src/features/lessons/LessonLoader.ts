import { LoaderFunction } from 'react-router-dom';
import { getLessonDetails } from '../../services/api';

export const lessonLoader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  if (id) {
    const response = await getLessonDetails(Number(id));
    return response;
  }
  throw new Error('Lesson ID is required');
};
