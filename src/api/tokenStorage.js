const SESSION_KEY = 'session';
const LAST_USER_KEY = 'lastUserName';

export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
};

export const getToken = () => getSession()?.token ?? null;

export const saveSession = (session) => localStorage.setItem(SESSION_KEY, JSON.stringify(session));

export const clearSession = () => localStorage.removeItem(SESSION_KEY);

export const getLastUserName = () => localStorage.getItem(LAST_USER_KEY) ?? '';

export const saveLastUserName = (userName) => localStorage.setItem(LAST_USER_KEY, userName);
