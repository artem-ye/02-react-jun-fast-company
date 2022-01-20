import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/profession.service';

const professionsSlice = createSlice({
    name: 'professions',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const {reducer: professionsReducer, actions} = professionsSlice;

function isOutDated(date) {
    return (Date.now() - date > 10*60*1000);
}

const loadProfessionsList = () => async (dispatch, getState) => {
    const {lastFetch} = getState().qualities;

    if (isOutDated(lastFetch)) {
        dispatch(actions.professionsRequested());
        try {
            const {content} = await professionService.get();
            dispatch(actions.professionsReceved(content));
        } catch (err) {
            dispatch(actions.professionsRequestFailed(err.message));
        }
    }
};

const getProfessions = () => (state) => state.professions.entities;
const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;
const getProfessionById = (id) => (state) => {
    if (!state.professions) {
        return {};
    }

    return state.professions.entities.find(prof => prof._id === id) || {};
};

export {
    loadProfessionsList,
    getProfessions,
    getProfessionsLoadingStatus,
    getProfessionById
};

export default professionsReducer;
