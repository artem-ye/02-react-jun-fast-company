import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService, { setTokens } from '../services/localStorage.service';
import userService from '../services/user.service';
import history from '../utils/history';
import randomAvatarUrl from '../utils/randomAvatarUrl';

// const INITIAL_STATE = {
//     entities: null,
//     isLoading: true,
//     error: null,
//     dataLoaded: false,
//     ...(!localStorageService.getAccessToken()
//         ? {isLoggedIn: false, auth: null}
//         : {isLoggedIn: true, auth: {userId: localStorageService.getUserId}}
//     )
// };

const INITIAL_STATE = {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: false,
    isLoggedIn: false,
    auth: null,

    ...(!localStorageService.getAccessToken()
        ? {}
        : {
            isLoading: false,
            isLoggedIn: true,
            auth: {userId: localStorageService.getUserId()}
        }
    )
};

// console.log(INITIAL_STATE, localStorageService.getAccessToken());

// console.log(INITITAL_STATE);

const userSlice = createSlice({
    name: 'users',
    // initialState: {
    //     entities: null,
    //     isLoading: true,
    //     error: null,
    //     auth: null,
    //     isLoggedIn: false,
    //     dataLoaded: false
    // },
    initialState: INITIAL_STATE,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        authRequested: (state, action) => {
            // null
        },
        authRequestSuccess: (state, action) => {
            state.auth = {...action.payload};
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },

        userCreateRequested: () => {
            // null
        },
        userCreateSuccess: (state, action) => {
            state.entities.push(action.payload);
        },
        userCreateFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const {reducer: usersReducer, actions} = userSlice;

// **********************************************************************
// Service methods
// **********************************************************************

const createUser = (payload) => async (dispatch) => {
    dispatch(actions.userCreateRequested());
    try {
        const {content} = await userService.create(payload);
        dispatch(actions.userCreateSuccess(content));
        history.push('/users');
    } catch (err) {
        dispatch(actions.userCreateFailed(err.message));
    }
};

// **********************************************************************
// Auth
// **********************************************************************

const signUp = ({email, password, ...rest}) => async (dispatch) => {
    dispatch(actions.authRequested());
    try {
        const data = await authService.register({email, password});
        setTokens(data);
        dispatch(actions.authRequestSuccess(
            {userId: data.localId}
        ));

        dispatch(
            createUser({
                _id: data.localId,
                email,
                rate: 10,
                completedMeetings: 0,
                image: randomAvatarUrl(),
                ...rest
            })
        );
    } catch (err) {
        dispatch(actions.authRequestFailed(err.message));
    }
};

const logIn = ({email, password}, redirectPath) => async (dispatch) => {
    dispatch(actions.authRequested());
    try {
        const data = await authService.logIn({email, password});
        setTokens(data);
        dispatch(actions.authRequestSuccess(
            {userId: data.localId}
        ));
        console.log('redirectiong to ', redirectPath);
        history.push(redirectPath);
    } catch (err) {
        dispatch(actions.authRequestFailed(err.message));
    }
};

// **********************************************************************
// Users list
// **********************************************************************

const loadUsersList = () => async (dispatch) => {
    dispatch(actions.usersRequested());
    try {
        const {content} = await userService.get();
        dispatch(actions.usersReceved(content));
    } catch (err) {
        // console.log('Fuck!!!!');
        dispatch(actions.usersRequestFailed(err.message));
    }
};

const getUsersList = () => (state) => state.users.entities;

const getUserById = (id) => (state) => {
    return state.users.entities.find(usr => usr._id === id);
};

const getIsLoggedIn = () => (state) => state.users.isLoggedIn;

const getDataLoadedStatus = () => (state) => state.users.dataLoaded;

const getCurrentUserId = () => (state) => {
    return state.users.auth.userId;
};

const getCurrentUser = () => (state) => {
    const userId = state.users.auth?.userId;
    if (!userId || !state.users.entities) {
        return null;
    }

    return state.users.entities.find(usr => usr._id === userId);
};

const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export {
    signUp,
    logIn,
    loadUsersList,

    getUserById,
    getUsersList,
    getDataLoadedStatus,
    getUsersLoadingStatus,
    getIsLoggedIn,
    getCurrentUserId,
    getCurrentUser

};

export default usersReducer;
