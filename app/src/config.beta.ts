const config = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_AKi849UHr',
  userPoolWebClientId: '1qei9084gdum632hggk6856j4f',
  oauth: {
    domain: 'openglot02.auth.us-east-1.amazoncognito.com',
    redirectSignIn: 'https://beta.openglot.com/oauth2/callback',
    redirectSignOut: 'https://beta.openglot.com/',
    scope: ['openid', 'profile', 'email'],
  },
};

export default config;