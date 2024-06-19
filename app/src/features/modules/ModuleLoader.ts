import { LoaderFunction } from 'react-router-dom';
import { getModuleDetails } from '../../services/api';

export const moduleLoader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  if (id) {
    const response = await getModuleDetails(Number(id));
    return response;
  }
  throw new Error('Module ID is required');
};
