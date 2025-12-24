let token: string | null = null;

export function setSessionToken(t: string) {
  token = t;
}

export function getSessionToken() {
  return token;
}

export function clearSession() {
  token = null;
}
