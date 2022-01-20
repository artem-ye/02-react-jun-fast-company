import qualitiesReducer from './qualities';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReucer = combineReducers({qualities: qualitiesReducer});

export function createSore() {
    return configureStore({
        reducer: rootReucer
    });
}
