import axios from 'axios';
import {toast} from 'react-toastify';
import appConfig from '../config.json';

const http = axios.create({
    baseURL: appConfig.apiEndPoint
});

http.interceptors.request.use(
    (config) => {
        if (appConfig.isFireBase) {
            let url = config.url;
            url = (url.endsWith('/') ? url.slice(0, -1) : url) + '.json';
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
        if (appConfig.isFireBase) {
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
