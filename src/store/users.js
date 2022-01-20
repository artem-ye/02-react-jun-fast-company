import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user.service';

const userSlice = createSlice({
    name: 'users',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const {reducer: usersReducer, actions} = userSlice;

const loadUsersList = () => async (dispatch) => {
    dispatch(actions.usersRequested());
    try {
        const {content} = await userService.get();
        dispatch(actions.usersReceved(content));
    } catch (err) {
        dispatch(actions.usersRequestFailed(err.message));
    }
};

const getUserById = (id) => (state) => {
    return state.users.entities.find(usr => usr._id === id);
};

const getUsersList = () => (state) => state.users.entities;

export {
    loadUsersList,
    getUserById,
    getUsersList
};

export default usersReducer;
