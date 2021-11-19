import httpService from './http.service';

const PROFESSION_END_POINT = 'profession/';

const professionService = {
    get: async () => {
        const {data} = await httpService.get(PROFESSION_END_POINT);
        return data;
    }
};

export default professionService;
