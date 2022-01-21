import axios from 'axios';
import {toast} from 'react-toastify';
import appConfig from '../config.json';
import httpAuth from '../services/auth.service';

import localStorageService from './localStorage.service';

const http = axios.create({
    baseURL: appConfig.apiEndPoint
});

http.interceptors.request.use(
    async (config) => {
        if (appConfig.isFireBase) {
            let url = config.url;
            url = (url.endsWith('/') ? url.slice(0, -1) : url) + '.json';

            const expiresDate = localStorageService.getExpiresTokenDate();
            const refreshToken = localStorageService.getRefreshToken();

            if (refreshToken && expiresDate < Date.now()) {
                const {data} = await httpAuth.post('token', {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                });
                localStorageService.setTokens({
                    idToken: data.id_token,
                    refreshToken: data.refresh_token,
                    localId: data.user_id,
                    expiresIn: data.expires_in
                });
            }

            const accessToken = localStorageService.getAccessToken();

            if (accessToken) {
                config.params = {...config.params, auth: accessToken};
            }

            return {...config, url};
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (successResp) => {
        if (appConfig.isFireBase && !successResp?.data?._id) {
            successResp.data = {
                content: Object.values(successResp?.data || {})
            };
        }
        return successResp;
    },
    (err) => {
        const expectedError = err.response &&
            err.response.status >= 400 &&
            err.response.status <= 500;

        if (!expectedError) {
            // toast('!!! UNEXPECTED http.service ERROR ' + err);
            toast.error('Oops http.service error: ' + err);
        }

        return Promise.reject(err);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
