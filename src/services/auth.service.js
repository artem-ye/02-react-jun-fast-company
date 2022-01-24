import axios from 'axios';
import localStorageService from './localStorage.service';

function getFireBaseApiKey() {
    return process.env.REACT_APP_FIREBASE_KEY;
}

const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: getFireBaseApiKey()
    }
});

const authService = {
    register: async ({email, password}) => {
        const {data} = await httpAuth.post('accounts:signUp', {email, password, returnSecureToken: true});
        return data;
    },
    logIn: async ({email, password}) => {
        const {data} = await httpAuth.post('accounts:signInWithPassword', {email, password, returnSecureToken: true});
        return data;
    },
    refresh: async () => {
        const refreshToken = localStorageService.getRefreshToken();
        const {data} = await httpAuth.post('token', {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        });
        return data;
    }
};

// export {authService};

export default authService;
