import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // restore session from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setAuthLoading(false);
      return;
    }

    (async () => {
      try {
        const data = await apiFetch("/auth/me");
        setUser(data.user);
      } catch {
        // token invalid/expired
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    })();
  }, []);

  const signUp = async ({ fullName, email, password }) => {
    try {
      const data = await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ fullName, email, password }),
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);

      return { ok: true, user: data.user };
    } catch (e) {
      return { ok: false, message: e.message };
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);

      return { ok: true, user: data.user };
    } catch (e) {
      return { ok: false, message: e.message };
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      authLoading,
      signUp,
      signIn,
      signOut,
    }),
    [user, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}