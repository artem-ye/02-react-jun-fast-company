import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';
import commentService from '../services/comment.service';

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        commentsCreateRequested: (state) => {
            state.isLoading = true;
        },
        commentsCreateSuccess: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        commentsCreateFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        commentsRemoveRequested: (state) => {
            state.isLoading = true;
        },
        commentsRemoveSuccess: (state, action) => {
            // state.entities.push(action.payload);
            state.entities = state.entities.filter(comment => comment._id !== action.payload);
            state.isLoading = false;
        },
        commentsRemoveFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const {reducer: commentsReducer, actions} = commentsSlice;

const loadCommentsList = (pageId) => async (dispatch) => {
    dispatch(actions.commentsRequested());
    try {
        const {content} = await commentService.getComments(pageId);
        dispatch(actions.commentsReceved(content));
    } catch (err) {
        dispatch(actions.commentsRequestFailed(err.message));
    }
};

const createComment = (data) => async (dispatch) => {
    dispatch(actions.commentsCreateRequested);
    try {
        const res = await commentService.createComment(data);
        dispatch(actions.commentsCreateSuccess(res));
    } catch (err) {
        dispatch(actions.commentsRequestFailed(err.message));
    }
};

const removeComment = (commentId) => async (dispatch) => {
    try {
        await commentService.removeComment(commentId);
        dispatch(actions.commentsRemoveSuccess(commentId));
        // console.log('Del res', content);
        // setComments(prev => prev.filter(comment => comment._id !== commentId));
    } catch (err) {
        dispatch(actions.commentsRemoveFailed(err.message));
    }
};

const getComments = () => (state) => state.comments.entities;
const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export {
    loadCommentsList,
    getComments,
    getCommentsLoadingStatus,
    createComment,
    removeComment
};

export default commentsReducer;
