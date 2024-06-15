import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
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
        const userInfo = extractUserInfo(newTokens.idToken);
        setAuthState({
          ...initialAuthState,
          user: { ...userInfo },
        });
      } else {
        setAuthState({ ...initialAuthState, user: null });
      }
    } else {
      const userInfo = extractUserInfo(idToken);
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
  const handleSignUp = async (
    email: string,
    password: string,
    confirmPassword: string,
    username: string
  ) => {
    if (password !== confirmPassword) {
      setAuthState({
        ...authState,
        error: { message: "Passwords do not match" } as CognitoError,
      });
      return;
    }
    setAuthState({ ...authState, loading: true });
    try {
      await signUp(email, password, username);
      setAuthState({ ...authState, loading: false });
      alert("Sign up successful! Please verify your email.");
      sessionStorage.setItem("emailForConfirmation", email);
      navigate("/signup-confirm");
    } catch (error) {
      const cognitoError = error as CognitoError;
      setAuthState({ ...authState, loading: false, error: cognitoError });
    }
  };

  const handleConfirmSignUp = async (code: string) => {
    setAuthState({ ...authState, loading: true });
    const email = sessionStorage.getItem("emailForConfirmation");
    if (!email) {
      setAuthState({
        ...authState,
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
      setAuthState({ ...authState, loading: false });
      sessionStorage.removeItem("emailForConfirmation");
      navigate("/login");
    } catch (error) {
      const cognitoError = error as CognitoError;
      setAuthState({ ...authState, loading: false, error: cognitoError });
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    setAuthState({ ...authState, loading: true });
    try {
      const result = await signIn(email, password);
      const userInfo = extractUserInfo(result.idToken);
      setAuthState({ ...authState, loading: false, user: userInfo });
      navigate("/");
      window.location.reload();
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
      try {
        await storeTokens(
          tokens.id_token,
          tokens.access_token,
          tokens.refresh_token
        );
        const userInfo = extractUserInfo(tokens.id_token);
        setAuthState({
          ...authState,
          user: { ...userInfo },
          loading: false,
        });
        navigate("/");
      } catch (error) {
        console.error("Failed to store tokens:", error);
        setAuthState({
          ...authState,
          loading: false,
          error: {
            message: "Failed to store tokens",
          } as CognitoError,
        });
      }
    } else {
      setAuthState({
        ...authState,
        loading: false,
        error: {
          message: "Failed to exchange code for tokens",
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
