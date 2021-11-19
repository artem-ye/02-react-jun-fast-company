import httpService from './http.service';

const QUALITY_END_POINT = 'quality/';

const qualityService = {
    get: async () => {
        const {data} = await httpService.get(QUALITY_END_POINT);
        return data;
    }
};

export default qualityService;
