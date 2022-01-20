import professionsReducer from './professions';
import qualitiesReducer from './qualities';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReucer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer
});

export function createSore() {
    return configureStore({
        reducer: rootReucer
    });
}
