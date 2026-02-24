// src/utils/localAuth.js
const USERS_KEY = "el_users";
const CURRENT_KEY = "el_currentUser";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getUsers() {
  return readJSON(USERS_KEY, []);
}

export function setUsers(users) {
  writeJSON(USERS_KEY, users);
}

export function getCurrentUser() {
  return readJSON(CURRENT_KEY, null);
}

export function setCurrentUser(user) {
  writeJSON(CURRENT_KEY, user);
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_KEY);
}