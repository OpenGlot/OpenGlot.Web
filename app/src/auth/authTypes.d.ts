export interface User {
  username: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  error: CognitoError | null;
  loading: boolean;
}

export interface CognitoError extends Error {
  code?: string;
  message: string;
}
