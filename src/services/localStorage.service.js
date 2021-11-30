const TOKEN_KEY = 'jwt-token';
const REFRESH_TOKEN_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';

export function setTokens({idToken, refreshToken, expiresIn=3600}) {
    const expiresDate = new Date().getTime + expiresIn * 1000;
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

const localStorageService = {
    setTokens, getAccessToken, getRefreshToken, getExpiresTokenDate
};

export default localStorageService;
