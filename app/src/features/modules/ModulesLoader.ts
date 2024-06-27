import { LoaderFunction } from 'react-router-dom';
import { getModules } from 'services';

export const modulesLoader: LoaderFunction = async () => {
  const modules = await getModules();
  return { modules };
};
