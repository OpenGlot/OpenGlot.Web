const config = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_AKi849UHr',
  userPoolWebClientId: '1qei9084gdum632hggk6856j4f',
  oauth: {
    domain: 'openglot02.auth.us-east-1.amazoncognito.com',
    redirectSignIn: 'http://localhost:8080/oauth2/callback',
    redirectSignOut: 'http://localhost:8080/',
    scope: ['openid', 'profile', 'email'],
  },
};

export default config;