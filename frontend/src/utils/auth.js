const AUTH_TOKEN = 'auth-token';

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN);
}

export function setAuthToken(token) {
    localStorage.setItem(AUTH_TOKEN, token);
}

export function removeAuthToken() {
    localStorage.removeItem(AUTH_TOKEN);
}
