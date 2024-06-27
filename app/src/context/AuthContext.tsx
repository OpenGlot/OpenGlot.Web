import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthState } from "types";
import { getTokens, storeTokens, isTokenExpired, extractUserInfo } from "utils";
import { refreshTokens } from "../services/authService";

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

interface AuthContextType {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  changeAuthState: (newState: Partial<AuthState>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedState = sessionStorage.getItem("authState");
    return storedState ? JSON.parse(storedState) : initialAuthState;
  });

  const checkUserSignInState = async () => {
    try {
      const { idToken, accessToken, refreshToken } = getTokens();

      if (!idToken || !accessToken || !refreshToken) return;

      if (isTokenExpired(idToken) || isTokenExpired(accessToken)) {
        const newTokens = await refreshTokens(refreshToken);
        if (!newTokens) {
          throw new Error("Failed to refresh tokens");
        }

        await storeTokens(
          newTokens.idToken,
          newTokens.accessToken,
          refreshToken
        );
        await updateUserInfo(newTokens.idToken);
      } else {
        await updateUserInfo(idToken);
      }
    } catch (error) {
      setAuthState(initialAuthState);
    }
  };

  const updateUserInfo = async (idToken: string) => {
    try {
      const userInfo = await extractUserInfo(idToken);
      const newState = {
        ...initialAuthState,
        user: { ...userInfo },
        isAuthenticated: true,
      };
      setAuthState(newState);
      sessionStorage.setItem("authState", JSON.stringify(newState));
    } catch (error) {
      setAuthState(initialAuthState);
      sessionStorage.removeItem("authState");
    }
  };

  const changeAuthState = (newState: Partial<AuthState>) => {
    setAuthState((prevState) => {
      const updatedState = { ...prevState, ...newState };
      sessionStorage.setItem("authState", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  useEffect(() => {
    checkUserSignInState();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState, changeAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
