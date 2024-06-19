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
