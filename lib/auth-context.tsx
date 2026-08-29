"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import type { AuthResponse } from "./authTypes";
import { json } from "stream/consumers";

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
        const stored = localStorage.getItem("auth");

        if (stored){
            const parsed: AuthResponse = JSON.parse(stored);
            setToken(parsed.token);
            setUser(parsed);
        }

    }, []);

    const setAuth = (response: AuthResponse) => {
        localStorage.setItem("auth", JSON.stringify(response));
        setToken(response.token);
        setUser(response);
    };

    const logout = () => {
        localStorage.removeItem("auth");
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
