import { User } from 'types';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: Error | null;
  loading: boolean;
}
