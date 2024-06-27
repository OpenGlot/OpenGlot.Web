import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../config";
import {
  signUp,
  confirmSignUp,
  signIn,
  googleSignIn,
  isTokenExpired,
  refreshTokens,
  extractUserInfo,
  exchangeCodeForTokens,
} from "../services/authService";
import { AuthState, CognitoError } from "../types/authTypes";
import { storeTokens, getTokens, removeTokens } from "../utils/storeGetTokens";

const API_URL = config.REACT_APP_API_URL;

// Initial auth state
const initialAuthState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

// Context type
interface AuthContextType {
  authState: AuthState;
  checkUserSignInState: () => Promise<void>;
  handleSignUp: (
    email: string,
    password: string,
    confirmPassword: string,
    username: string
  ) => Promise<void>;
  handleConfirmSignUp: (code: string) => Promise<void>;
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleGoogleSignInCallback: (authorizationCode: string) => Promise<void>;
  handleSignOut: () => void;
  handleGoogleSignIn: () => void;
  handleFBSignIn: () => void;
  handleAppleSignIn: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const navigate = useNavigate();

  const checkUserSignInState = async () => {
    const { idToken, accessToken, refreshToken } = getTokens();

    if (!idToken || !accessToken || !refreshToken) {
      setAuthState({ ...initialAuthState, user: null });
      return;
    }

    if (isTokenExpired(idToken) || isTokenExpired(accessToken)) {
      const newTokens = await refreshTokens(refreshToken);
      if (newTokens) {
        await storeTokens(
          newTokens.idToken,
          newTokens.accessToken,
          refreshToken
        );
        const userInfo = await extractUserInfo(newTokens.idToken);
        setAuthState({
          ...initialAuthState,
          user: { ...userInfo },
        });
      } else {
        setAuthState({ ...initialAuthState, user: null });
      }
    } else {
      const userInfo = await extractUserInfo(idToken);
      setAuthState({
        ...initialAuthState,
        user: { ...userInfo },
      });
    }
  };

  // Check user sign-in state on mount
  useEffect(() => {
    checkUserSignInState();
  }, []);

  // Handlers
  const handleAuthState = (newState: Partial<AuthState>) => {
    setAuthState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const handleSignUp = async (
    email: string,
    password: string,
    confirmPassword: string,
    username: string
  ) => {
    if (password !== confirmPassword) {
      handleAuthState({
        error: { message: "Passwords do not match" } as CognitoError,
      });
      return;
    }

    handleAuthState({ loading: true });

    try {
      await signUp(email, password, username);
      handleAuthState({ loading: false });
      localStorage.setItem("email-pending", email);
      alert("Sign up successful! Please verify your email.");
      sessionStorage.setItem("emailForConfirmation", email);
      navigate("/signup-confirm");
    } catch (error) {
      const cognitoError = error as CognitoError;
      handleAuthState({ loading: false, error: cognitoError });
    }
  };

  const handleConfirmSignUp = async (code: string) => {
    handleAuthState({ loading: true });

    const email = sessionStorage.getItem("emailForConfirmation");
    if (!email) {
      handleAuthState({
        loading: false,
        error: {
          message: "Email not found",
          name: "EmailNotFound",
        } as CognitoError,
      });
      return;
    }
    try {
      await confirmSignUp(email, code);
      handleAuthState({ loading: false });
      sessionStorage.removeItem("emailForConfirmation");
      navigate("/login");
    } catch (error) {
      const cognitoError = error as CognitoError;
      handleAuthState({ loading: false, error: cognitoError });
    }
  };

  const postLogin = async (idToken: string) => {
    try {
      const response = await axios.post(
        `${API_URL}users/login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        navigate("/enter-info");
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const processSignIn = async (idToken: string) => {
    const userInfo = await extractUserInfo(idToken);
    await postLogin(idToken);
    handleAuthState({ user: { ...userInfo }, loading: false });
  };

  const handleSignIn = async (email: string, password: string) => {
    handleAuthState({ loading: true });
    try {
      const result = await signIn(email, password);
      await processSignIn(result.idToken.jwtToken);
    } catch (error) {
      const cognitoError = error as CognitoError;
      handleAuthState({ loading: false, error: cognitoError });
    }
  };

  const handleGoogleSignInCallback = async (authorizationCode: string) => {
    handleAuthState({ loading: true });
    try {
      const tokens = await exchangeCodeForTokens(authorizationCode);
      if (tokens) {
        await storeTokens(
          tokens.id_token,
          tokens.access_token,
          tokens.refresh_token
        );
        await processSignIn(tokens.id_token);
      } else {
        throw new Error("Failed to exchange code for tokens");
      }
    } catch (error) {
      console.error("Failed to store tokens or exchange code:", error);
      handleAuthState({
        loading: false,
        error: {
          message: "An unexpected error occurred",
        } as CognitoError,
      });
    }
  };

  const handleSignOut = () => {
    removeTokens();
    setAuthState(initialAuthState);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        checkUserSignInState,
        handleSignUp,
        handleConfirmSignUp,
        handleSignIn,
        handleGoogleSignInCallback,
        handleSignOut,
        handleGoogleSignIn: googleSignIn,
        handleFBSignIn: () => {},
        handleAppleSignIn: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
