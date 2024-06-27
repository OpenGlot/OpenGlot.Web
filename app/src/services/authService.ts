import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import axios from 'axios';
import { config } from '../config';
import { CognitoError } from '../types/authTypes';
import { storeTokens } from '../utils/storeGetTokens';
import { User } from '../types/authTypes';

const userPool = new CognitoUserPool({
  UserPoolId: config.userPoolId,
  ClientId: config.userPoolWebClientId,
});

const { domain, redirectSignIn } = config.oauth;
const clientId = config.userPoolWebClientId;

export const signUp = (
  email: string,
  password: string,
  username: string
): Promise<any> => {
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
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

export const confirmSignUp = (email: string, code: string): Promise<any> => {
  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      console.log(code);
      if (err) {
        return reject(err);
      }
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
      onSuccess: (result) => {
        console.log('Login successful:', result);
        storeTokens(
          result.getIdToken().getJwtToken(),
          result.getAccessToken().getJwtToken(),
          result.getRefreshToken().getToken()
        );
        resolve(result);
      },
      onFailure: (err) => reject(err as CognitoError),
    });
  });
};

export const googleSignIn = () => {
  const redirectUri = encodeURIComponent(redirectSignIn);
  const url = `https://${domain}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&identity_provider=Google`;
  window.location.assign(url);
};

const parseJwt = (token: string): any | null => {
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
    console.log('refreshed');
    return {
      idToken: data.id_token,
      accessToken: data.access_token,
    };
  } catch (error) {
    console.error('Failed to refresh tokens:', error);
    return null;
  }
};

export const extractUserInfo = async (idToken: string): Promise<User> => {
  const decoded = parseJwt(idToken);
  return {
    email: decoded?.email || '',
    username: decoded?.['cognito:username'] || '',
    name: decoded?.name || '',
    dob: decoded?.dob || '',
  };
};

export const resendConfirmationCode = async () => {
  const email = localStorage.getItem('email-pending');
  console.log(email);

  if (!email) {
    console.error('No email found in localStorage');
    alert('No email found. Please sign up again.');
    return;
  }

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.resendConfirmationCode((err, result) => {
    if (err) {
      console.error('Error resending confirmation code:', err.message || err);
      alert(`Error resending confirmation code: ${err.message || err}`);
    } else {
      console.log('Resend confirmation code success:', result);
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
        alert('Code sent successfully');
        console.log('Code sent successfully:', data);
        localStorage.setItem('email-reseting', email);
        resolve();
      },
      onFailure: (err) => {
        console.error('Error sending code:', err.message || err);
        reject(err);
      },
    });
  });
};

export const resetPassword = async (
  verificationCode: string,
  newPassword: string
): Promise<void> => {
  const email = localStorage.getItem('email-reseting');

  if (!email) {
    console.error('No email found in localStorage');
    alert('No email found. Please sign up again.');
    return;
  }

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        console.log('Password reset successfully');
        resolve();
      },
      onFailure: (err) => {
        console.error('Error resetting password:', err.message || err);
        reject(err);
      },
    });
  });
};
