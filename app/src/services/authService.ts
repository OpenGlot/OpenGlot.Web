import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import axios from 'axios';
import { config } from 'config';

const userPool = new CognitoUserPool({
  UserPoolId: config.userPoolId,
  ClientId: config.userPoolWebClientId,
});

const {
  oauth: { domain, redirectSignIn },
  userPoolWebClientId: clientId,
} = config;

export const signUp = (email: string, password: string, username: string) => {
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
    new CognitoUserAttribute({
      Name: 'name',
      Value: username,
    }),
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const confirmSignUp = (email: string, code: string): Promise<any> => {
  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export const signIn = (email: string, password: string): Promise<any> => {
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: async (result) => {
        resolve(result);
      },
      onFailure: (err) => reject(err),
    });
  });
};

export const googleSignIn = () => {
  const redirectUri = encodeURIComponent(redirectSignIn);
  const url = `https://${domain}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&identity_provider=Google`;
  window.location.assign(url);
};

export const exchangeCodeForTokens = async (authorizationCode: string) => {
  const tokenEndpoint = `https://${domain}/oauth2/token`;
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', clientId);
  params.append('code', authorizationCode);
  params.append('redirect_uri', redirectSignIn);

  try {
    const response = await axios.post(tokenEndpoint, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const refreshTokens = async (refreshToken: string) => {
  const tokenEndpoint = `https://${domain}/oauth2/token`;
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', clientId);
  params.append('refresh_token', refreshToken);

  try {
    const response = await axios.post(tokenEndpoint, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to refresh tokens');
    }

    const data = response.data;
    return {
      idToken: data.id_token,
      accessToken: data.access_token,
    };
  } catch (error) {
    console.error('Failed to refresh tokens:', error);
    return null;
  }
};

export const resendConfirmationCode = async () => {
  const email = sessionStorage.getItem('emailForConfirmation');
  if (!email) return;

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.resendConfirmationCode((err, result) => {
    if (err) {
      alert(`Error resending confirmation code: ${err.message || err}`);
    } else {
      alert('Resent confirmation code, please check your email');
    }
  });
};

export const forgotPassword = async (email: string): Promise<void> => {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        alert('Email sent successfully');
        sessionStorage.setItem('email-reseting', email);
        resolve();
      },
      onFailure: (err) => {
        alert('Error sending email');
        reject(err);
      },
    });
  });
};

export const resetPassword = async (
  verificationCode: string,
  newPassword: string
): Promise<void> => {
  const email = sessionStorage.getItem('email-reseting');

  if (!email) return;

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        alert('Password reset successfully');
        resolve();
      },
      onFailure: (err) => {
        alert('Error resetting password');
        reject(err);
      },
    });
  });
};
