import httpService from './http.service';

const USER_END_POINT = 'user/';

const userService = {
    get: async () => {
        const {data} = await httpService.get(USER_END_POINT);
        return data;
    }
};

export default userService;
