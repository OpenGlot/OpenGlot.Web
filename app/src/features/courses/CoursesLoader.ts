import { LoaderFunction } from 'react-router-dom';
import { getCourses } from '../../services/api';

export const coursesLoader: LoaderFunction = async () => {
  const courses = await getCourses();
  return { courses };
};
