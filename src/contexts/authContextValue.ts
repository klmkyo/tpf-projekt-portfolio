import { createContext } from "react";
import type { User } from "firebase/auth";

export type AuthContextValue = {
  currentUser: User | null;
  isAuthReady: boolean;
  isConfigured: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
