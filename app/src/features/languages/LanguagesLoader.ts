import { LoaderFunction } from 'react-router-dom';
import { getLanguages } from '../../services/api';

export const languagesLoader: LoaderFunction = async () => {
  const languages = await getLanguages();
  return { languages };
};
