// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getUsers,
  setUsers,
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
} from "../utils/localAuth";

const AuthContext = createContext(null);

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function safeUser(user) {
  const { password, ...rest } = user;
  return rest;
}

function makeId() {
  return crypto?.randomUUID?.() ?? String(Date.now());
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // ✅ add this

  useEffect(() => {
    const existing = getCurrentUser();
    setUser(existing);
    setAuthLoading(false); // ✅ important
  }, []);

  const signUp = ({ fullName, email, password }) => {
    const users = getUsers();
    const normalizedEmail = normalizeEmail(email);

    const exists = users.some((u) => normalizeEmail(u.email) === normalizedEmail);
    if (exists) return { ok: false, message: "An account with this email already exists." };

    const newUser = {
      id: makeId(),
      fullName: String(fullName).trim(),
      email: normalizedEmail,
      password: String(password),
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);

    const loggedIn = safeUser(newUser);
    setCurrentUser(loggedIn);
    setUser(loggedIn);

    return { ok: true, user: loggedIn };
  };

  const signIn = ({ email, password }) => {
    const users = getUsers();
    const normalizedEmail = normalizeEmail(email);

    const found = users.find((u) => normalizeEmail(u.email) === normalizedEmail);
    if (!found) return { ok: false, message: "No account found for this email." };
    if (String(found.password) !== String(password)) return { ok: false, message: "Incorrect password." };

    const loggedIn = safeUser(found);
    setCurrentUser(loggedIn);
    setUser(loggedIn);

    return { ok: true, user: loggedIn };
  };

  const signOut = () => {
    clearCurrentUser();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      authLoading, // ✅ expose it
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
// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem('user');
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const signIn = (email, password) => {
//     const newUser = { email };
//     setUser(newUser);
//     localStorage.setItem('user', JSON.stringify(newUser));
//   };

//   const signOut = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
