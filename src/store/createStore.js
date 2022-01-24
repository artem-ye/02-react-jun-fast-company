import commentsReducer from './comments';
import professionsReducer from './professions';
import qualitiesReducer from './qualities';
import usersReducer from './users';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReucer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer,
    comments: commentsReducer
});

export function createSore() {
    return configureStore({
        reducer: rootReucer
    });
}
