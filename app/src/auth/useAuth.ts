import { useState, useEffect } from 'react';
import {
  signUp,
  confirmSignUp,
  signIn,
  googleSignIn,
  isTokenExpired,
  refreshTokens,
  extractUserInfo,
  exchangeCodeForTokens,
} from './authService';
import { AuthState, CognitoError } from './authTypes';
import { useNavigate } from 'react-router-dom';
import { storeTokens, getTokens, removeTokens } from '../utils/storeGetTokens';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSignInState = async () => {
      const { idToken, accessToken, refreshToken } = getTokens();

      if (!idToken || !accessToken || !refreshToken) {
        setAuthState({ ...authState, user: null });
        return;
      }

      if (isTokenExpired(idToken) || isTokenExpired(accessToken)) {
        const newTokens = await refreshTokens(refreshToken);
        if (newTokens) {
          storeTokens(newTokens.idToken, newTokens.accessToken, refreshToken);
          const userInfo = extractUserInfo(newTokens.idToken);
          setAuthState({
            ...authState,
            user: { ...userInfo },
          });
        } else {
          setAuthState({ ...authState, user: null });
        }
      } else {
        const userInfo = extractUserInfo(idToken);
        setAuthState({
          ...authState,
          user: { ...userInfo },
        });
      }
    };

    checkUserSignInState();
  }, []);

  const handleSignUp = async (
    email: string,
    password: string,
    confirmPassword: string,
    username: string
  ) => {
    if (password !== confirmPassword) {
      setAuthState({
        ...authState,
        error: {
          message: 'Passwords do not match',
        } as CognitoError,
      });
      return;
    }
    setAuthState({ ...authState, loading: true });
    try {
      const result = await signUp(email, password, username);
      setAuthState({ ...authState, loading: false });
      alert('Sign up successful! Please verify your email.');
      sessionStorage.setItem('emailForConfirmation', email);
      navigate('/signup-confirm');
    } catch (error) {
      const cognitoError = error as CognitoError;
      setAuthState({ ...authState, loading: false, error: cognitoError });
    }
  };

  const handleConfirmSignUp = async (code: string) => {
    setAuthState({ ...authState, loading: true });
    const email = sessionStorage.getItem('emailForConfirmation'); // Retrieve email from session storage
    if (!email) {
      setAuthState({
        ...authState,
        loading: false,
        error: {
          message: 'Email not found',
          name: 'EmailNotFound',
        } as CognitoError,
      });
      return;
    }
    try {
      await confirmSignUp(email, code);
      setAuthState({ ...authState, loading: false });
      sessionStorage.removeItem('emailForConfirmation'); // Optionally remove email from session storage
      navigate('/login'); // Redirect to login after successful confirmation
    } catch (error) {
      const cognitoError = error as CognitoError;
      setAuthState({ ...authState, loading: false, error: cognitoError });
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    setAuthState({ ...authState, loading: true });
    try {
      const result = await signIn(email, password);
      setAuthState({ ...authState, loading: false, user: result });
      navigate('/');
    } catch (error) {
      const cognitoError = error as CognitoError;
      setAuthState({ ...authState, loading: false, error: cognitoError });
    }
  };

  const handleGoogleSignInCallback = async (authorizationCode: string) => {
    setAuthState({ ...authState, loading: true });
    const tokens = await exchangeCodeForTokens(authorizationCode);

    if (tokens) {
      console.log(tokens);
      storeTokens(tokens.id_token, tokens.access_token, tokens.refresh_token);
      const userInfo = extractUserInfo(tokens.id_token);
      setAuthState({
        ...authState,
        user: { ...userInfo },
        loading: false,
      });
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 2000);
    } else {
      setAuthState({
        ...authState,
        loading: false,
        error: {
          message: 'Failed to exchange code for tokens',
        } as CognitoError,
      });
    }
  };

  const handleSignOut = () => {
    removeTokens();
    setAuthState({
      user: null,
      error: null,
      loading: false,
    });
    window.location.reload();
    navigate('/');
  };

  return {
    authState,
    handleSignUp,
    handleConfirmSignUp,
    handleSignIn,
    handleGoogleSignInCallback,
    handleSignOut,
    handleGoogleSignIn: googleSignIn,
    handleFBSignIn: () => {},
    handleAppleSignIn: () => {},
  };
};
