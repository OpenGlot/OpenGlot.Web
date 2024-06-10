import Cookies from 'js-cookie';

export const storeTokens = (
  idToken: string,
  accessToken: string,
  refreshToken: string
) => {
  Cookies.set('idToken', idToken, {
    secure: true,
    sameSite: 'strict',
  });
  Cookies.set('accessToken', accessToken, {
    secure: true,
    sameSite: 'strict',
  });
  Cookies.set('refreshToken', refreshToken, {
    secure: true,
    sameSite: 'strict',
  });
};

export const getTokens = () => {
  return {
    idToken: Cookies.get('idToken'),
    accessToken: Cookies.get('accessToken'),
    refreshToken: Cookies.get('refreshToken'),
  };
};

export const removeTokens = () => {
  Cookies.remove('idToken');
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};
