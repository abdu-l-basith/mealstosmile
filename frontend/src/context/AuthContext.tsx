"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface AdminUser {
  username: string;
  name: string;
  role: string;
  email: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = "sacrednat_admin_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed && parsed.username === "admin") {
          setUser(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load auth session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (username: string, password: string) => {
    // Hardcoded requirement: username 'admin' and password '123'
    if (username.trim() === "admin" && password === "123") {
      const adminData: AdminUser = {
        username: "admin",
        name: "Administrator",
        role: "Super Admin",
        email: "admin@mealtosmile.org",
      };
      try {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminData));
      } catch (e) {
        console.error("Failed to persist auth session", e);
      }
      setUser(adminData);
      return { success: true };
    }

    return {
      success: false,
      error: "Invalid username or password. (Hint: admin / 123)",
    };
  };

  const logout = () => {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear auth session", e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
