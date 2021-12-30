import httpService from './http.service';

const END_POINT = 'comment/';

const commentService = {
    createComment: async (comment) => {
        const {data} = await httpService.put(END_POINT+comment._id, comment);
        return data;
    },
    getComments: async (pageId) => {
        const {data} = await httpService.get(END_POINT, {
            params: {
                indexOn: '"pageId"',
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    removeComment: async (commentId) => {
        const {data} = await httpService.delete(END_POINT+commentId);
        return data;
    },
};

export default commentService;
