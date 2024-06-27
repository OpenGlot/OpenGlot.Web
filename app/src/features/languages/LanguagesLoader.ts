import { LoaderFunction } from 'react-router-dom';
import { getLanguages } from 'services';

export const languagesLoader: LoaderFunction = async () => {
  const languages = await getLanguages();
  return { languages };
};
