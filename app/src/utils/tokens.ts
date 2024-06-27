import { User } from '../types';

export const storeTokens = (
  idToken: string,
  accessToken: string,
  refreshToken: string
) => {
  return Promise.all([
    localStorage.setItem('idToken', idToken),
    localStorage.setItem('accessToken', accessToken),
    localStorage.setItem('refreshToken', refreshToken),
  ]);
};

export const getTokens = () => {
  return {
    idToken: localStorage.getItem('idToken'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  };
};

export const removeTokens = () => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const parseJwt = (token: string): any | null => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = parseJwt(token);
  if (!decoded) {
    return true;
  }
  const exp = decoded.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  return exp < currentTime;
};

export const extractUserInfo = async (idToken: string): Promise<User> => {
  try {
    const decoded = parseJwt(idToken);
    return {
      userId: decoded?.['cognito:username'] || '',
      email: decoded?.email || '',
      username: decoded?.name || '',
    };
  } catch (error) {
    throw new Error('Invalid token or failed to parse JWT');
  }
};
