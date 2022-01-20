const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReucer = combineReducers({});

export function createSore() {
    return configureStore({
        reducer: rootReucer
    });
}
