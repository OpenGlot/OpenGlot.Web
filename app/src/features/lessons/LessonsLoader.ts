import { LoaderFunction } from 'react-router-dom';
import { getLessons } from '../../services/api';

export const lessonsLoader: LoaderFunction = async () => {
  const lessons = await getLessons();
  return { lessons };
};
