"use client";

import { authService } from "@/services/authService";
import { userService } from "@/services/userServices";
import { User } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IAuthContext {
  isChecked: boolean;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const user = localStorage.getItem("user");

      if (user) setCurrentUser(JSON.parse(user));
    } catch {
      console.error("User is not authentificated");

      setCurrentUser(null);
    } finally {
      setIsChecked(true);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    authService.login(email, password);

    const user = await userService.getCurrentUser();

    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = useMemo(
    () => ({
      isChecked,
      currentUser,
      setCurrentUser,
      checkAuth,
      login,
      logout,
    }),
    [isChecked, currentUser, checkAuth, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
