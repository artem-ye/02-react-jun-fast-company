import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../services/quality.service';

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            // console.log('now', Date.now());
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const {reducer: qualitiesReducer, actions} = qualitiesSlice;

function isOutDated(date) {
    return (Date.now() - date > 10*60*1000);
}

const loadQualitiesList = () => async (dispatch, getState) => {
    const {lastFetch} = getState().qualities;

    if (isOutDated(lastFetch)) {
        dispatch(actions.qualitiesRequested());
        try {
            const {content} = await qualityService.get();
            dispatch(actions.qualitiesReceved(content));
        } catch (err) {
            dispatch(actions.qualitiesRequestFailed(err.message));
        }
    }
};

const getQualities = () => (state) => state.qualities.entities;
const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;
const getQalitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        return qualitiesIds.reduce((acc, id) => {
            const findRes = state.qualities.entities.find(q => q._id === id);
            if (findRes !== undefined) {
                return [...acc, findRes];
            }
            return acc;
        }, []);
    }
};

export {
    loadQualitiesList,
    getQualities,
    getQualitiesLoadingStatus,
    getQalitiesByIds,
};

export default qualitiesReducer;
