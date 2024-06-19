const config = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_AKi849UHr',
  userPoolWebClientId: '1qei9084gdum632hggk6856j4f',
  oauth: {
    domain: 'openglot02.auth.us-east-1.amazoncognito.com',
    redirectSignIn: 'https://localhost/oauth2/callback',
    redirectSignOut: 'https://localhost/',
    scope: ['openid', 'profile', 'email'],
  },
  REACT_APP_API_URL: 'https://localhost/api/',
};

export default config;
