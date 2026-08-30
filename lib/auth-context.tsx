"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import type { AuthResponse } from "./authTypes";
import { getAuthCookie, setAuthCookie, clearAuthCookie } from "./cookies";

interface AuthState {
    user: Omit<AuthResponse, "token"> | null;
    token: string | null;
    setAuth: (response: AuthResponse) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);


export function AuthProvider({children}: {children: ReactNode}){
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AuthState["user"]>(null);

    useEffect(() => {
        const stored = getAuthCookie();

        if (stored){
            try {
                const parsed: AuthResponse = JSON.parse(stored);
                setToken(parsed.token);
                setUser(parsed);
            } catch {
                clearAuthCookie();
            }
        }

    }, []);

    const setAuth = (response: AuthResponse) => {
        setAuthCookie(JSON.stringify(response));
        setToken(response.token);
        setUser(response);
    };

    const logout = () => {
        clearAuthCookie();
        setToken(null);
        setUser(null);
    };

   return (
    <AuthContext.Provider value={{ user, token, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
    const ctx = useContext(AuthContext);

    if (!ctx) throw new Error("useAuth must be used within AuthProvider");

    return ctx;
}
