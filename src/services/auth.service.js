import axios from 'axios';

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
    }
};

export default authService;
