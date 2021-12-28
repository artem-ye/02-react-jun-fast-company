const TOKEN_KEY = 'jwt-token';
const REFRESH_TOKEN_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const USER_ID_KEY = 'user-local-id';

export function setTokens({idToken, refreshToken, localId, expiresIn=3600}) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USER_ID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getExpiresTokenDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
    return localStorage.getItem(USER_ID_KEY);
}

export function removeAuthData() {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

const localStorageService = {
    setTokens, getAccessToken, getRefreshToken, getExpiresTokenDate, getUserId, removeAuthData
};

export default localStorageService;
