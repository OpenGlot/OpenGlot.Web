import { LoaderFunction } from 'react-router-dom';
import { getCourseDetails } from '../../services/api';

export const courseLoader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  if (id) {
    const response = await getCourseDetails(Number(id));
    return response;
  }
  throw new Error('course ID is required');
};
