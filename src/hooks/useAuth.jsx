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
            const imgUrl =
                `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`.trim().replaceAll('\n', '');

            await createUser({
                _id: data.localId,
                email,
                rate: 10,
                completedMeetings: 0,
                image: imgUrl,
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

            throw new Error('Возникла ошибка. Попробуйте позже');
        }
    };

    async function signIn({email, password, ...rest}) {
        try {
            const {data} = await httpAuth.post('accounts:signInWithPassword', {email, password, returnSecureToken: true});
            setTokens(data);
            await getUserData();
        } catch (err) {
            // const {code, message} = err.response.data.error;
            const {code} = err.response.data.error;

            if (code === 400) {
                throw new Error('Ошибка авторизации');
            }

            errorCatcher(err);
            throw new Error('Возникла ошибка. Попробуйте позже');
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

    async function updateUserData(user) {
        if (user._id !== currentUser._id) {
            throw new Error('Fuck!!!');
        };

        const payload = {...currentUser, ...user};

        try {
            await createUser(payload);
        } catch (err) {
            errorCatcher(err);
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
        <AuthContext.Provider value={{currentUser, signUp, signIn, logout, updateUserData}}>
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
            const errMsg = 'Network error: ' +
                error?.response?.status + ' ' +
                (error?.response?.data?.error?.message || error?.response?.statusText);
            toast.error(errMsg);
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
