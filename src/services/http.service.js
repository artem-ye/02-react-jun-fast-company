import axios from 'axios';
import {toast} from 'react-toastify';
import appConfig from '../config.json';

axios.defaults.baseURL = appConfig.apiEndPoint;

axios.interceptors.request.use(
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

axios.interceptors.response.use(
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
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
