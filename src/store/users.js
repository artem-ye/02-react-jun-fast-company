import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import { setTokens } from '../services/localStorage.service';
import userService from '../services/user.service';

const userSlice = createSlice({
    name: 'users',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null,
        isLogedIn: false
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
        },
        authRequested: (state, action) => {
            // return null;
        },
        authRequesSuccessed: (state, action) => {
            state.auth = {...action.payload, isLogedIn: true};
        },
        authRequesFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const {reducer: usersReducer, actions} = userSlice;

// -----------------------------------------------------
// Auth
// -----------------------------------------------------

const signUp = ({email, password}) => async (dispatch) => {
    try {
        dispatch(actions.authRequested());
        const data = await authService.register({email, password});
        setTokens(data);
        dispatch(actions.authRequesSuccessed({
            userId: data.localId
        }));
    } catch (err) {
        dispatch(actions.authRequesFailed(err.message));
    }
};

// -----------------------------------------------------
// Users list
// -----------------------------------------------------

const loadUsersList = () => async (dispatch) => {
    dispatch(actions.usersRequested());
    try {
        const {content} = await userService.get();
        dispatch(actions.usersReceved(content));
    } catch (err) {
        dispatch(actions.usersRequestFailed(err.message));
    }
};

const getUsersList = () => (state) => state.users.entities;

const getUserById = (id) => (state) => {
    return state.users.entities.find(usr => usr._id === id);
};

export {
    signUp,
    loadUsersList,
    getUserById,
    getUsersList
};

export default usersReducer;
