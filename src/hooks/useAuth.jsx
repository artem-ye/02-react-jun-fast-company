import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import { setTokens } from '../services/localStorage.service';

const httpAuth = axios.create({
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
    const {errorCatcher} = useErrorCatcher();
    const [currentUser, setCurrentUser] = useState({});

    async function signUp ({email, password, ...rest}) {
        try {
            const {data} = await httpAuth.post('accounts:signUp', {email, password, returnSecureToken: true});
            setTokens(data);
            await createUser({_id: data.localId, email, ...rest});
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
            const {content} = userService.create(data);
            setCurrentUser(content);
        } catch (err) {
            errorCatcher(err);
        }
    }

    return (
        <AuthContext.Provider value={{currentUser, signUp, signIn}}>
            {children}
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
