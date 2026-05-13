import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { auth } from "../lib/firebase";
import { AuthContext, type AuthContextValue } from "./authContextValue";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(!auth);

  useEffect(() => {
    if (!auth) {
      return undefined;
    }

    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthReady(true);
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Firebase is not configured. Fill the VITE_FIREBASE_* values in .env.");
    }

    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    if (!auth) {
      return;
    }

    await signOut(auth);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      isAuthReady,
      isConfigured: Boolean(auth),
      login,
      logout,
    }),
    [currentUser, isAuthReady, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
