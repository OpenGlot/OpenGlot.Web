export const config = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_tYCzYxsdJ',
  userPoolWebClientId: '30dhm1r5vef2pgqm5aljrk1qsg',
  oauth: {
    domain: 'openglot01.auth.us-east-1.amazoncognito.com',
    redirectSignIn: 'http://localhost:3000/oauth2/callback',
    redirectSignOut: 'http://localhost:3000/',
    scope: ['openid', 'profile', 'email'],
  },
};
