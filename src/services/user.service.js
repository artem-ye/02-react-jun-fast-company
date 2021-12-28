import httpService from './http.service';
import localStorageService from './localStorage.service';

const USER_END_POINT = 'user/';

const userService = {
    get: async () => {
        const {data} = await httpService.get(USER_END_POINT);
        return data;
    },
    create: async (payload) => {
        const {data} = await httpService.put(USER_END_POINT + payload._id, payload);
        return data;
    },
    getCurrentUser: async () => {
        const {data} = await httpService.get(USER_END_POINT + localStorageService.getUserId());
        return data;
    }
};

export default userService;
