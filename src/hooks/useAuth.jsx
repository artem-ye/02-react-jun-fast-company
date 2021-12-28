import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import localStorageService, { setTokens } from '../services/localStorage.service';
import { useHistory } from 'react-router-dom';

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: getFireBaseApiKey()
    }
});
const AuthContext = React.createContext([]);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const {errorCatcher} = useErrorCatcher();
    const [currentUser, setCurrentUser] = useState(undefined);
    const history = useHistory();

    async function signUp ({email, password, ...rest}) {
        try {
            const {data} = await httpAuth.post('accounts:signUp', {email, password, returnSecureToken: true});
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: 10,
                completedMeetings: 0,
                ...rest
            });
        } catch (err) {
            errorCatcher(err);
            const {code, message} = err.response.data.error;

            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errObj = {email: 'Email ealready exists'};
                    throw errObj;
                }
            }
        }
    };

    async function signIn({email, password, ...rest}) {
        try {
            const {data} = await httpAuth.post('accounts:signInWithPassword', {email, password, returnSecureToken: true});
            setTokens(data);
            await getUserData();
        } catch (err) {
            errorCatcher(err);
            const {code, message} = err.response.data.error;

            if (code === 400) {
                if (message === 'EMAIL_NOT_FOUND' || message === 'INVALID_PASSWORD') {
                    throw new Error('Ошибка авторизации');
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const userData = await userService.create(data);
            setCurrentUser(userData);
        } catch (err) {
            errorCatcher(err);
        }
    }

    function logout() {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        history.push('/');
    }

    async function getUserData() {
        try {
            const data = await userService.getCurrentUser();
            setCurrentUser(data);
        } catch (err) {
            errorCatcher(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{currentUser, signUp, signIn, logout}}>
            {isLoading
                ? (<h1>loading...</h1>)
                : children
            }
        </AuthContext.Provider>
    );
};

function getFireBaseApiKey() {
    return process.env.REACT_APP_FIREBASE_KEY;
}

function useErrorCatcher() {
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            // alert('ERROR OCCURED', error);
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        if (error?.response?.data?.message) {
            const {message} = error.response.data;
            setError(message);
        } else {
            setError(error);
        }
    }

    return {errorCatcher};
}
