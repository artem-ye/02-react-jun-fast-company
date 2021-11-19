import axios from 'axios';
import {toast} from 'react-toastify';
import config from '../config.json';

axios.defaults.baseURL = config.apiEndPoint;
axios.interceptors.response.use(
    (successResp) => successResp,
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
