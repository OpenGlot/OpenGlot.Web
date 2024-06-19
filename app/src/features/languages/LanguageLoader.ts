import { LoaderFunction } from 'react-router-dom';
import { getLanguageDetails } from '../../services/api';

export const languageLoader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  if (id) {
    const response = await getLanguageDetails(Number(id));
    return response;
  }
  throw new Error('Language ID is required');
};
