import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../services/quality.service';

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const {reducer: qualitiesReducer, actions} = qualitiesSlice;

const loadQualitiesList = () => async (dispatch) => {
    dispatch(actions.qualitiesRequested());
    try {
        const {content} = await qualityService.get();
        dispatch(actions.qualitiesReceved(content));
    } catch (err) {
        dispatch(actions.qualitiesRequestFailed(err.message));
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

        // const qualityArray = [];

        // qualitiesIds.forEach(id => {
        //     const findRes = state.qualities.entities.find(q => q._id === id);
        //     if (findRes !== undefined) {
        //         qualityArray.push(findRes);
        //     }
        // });

        // return qualityArray;
    }
};

export {
    loadQualitiesList,
    getQualities,
    getQualitiesLoadingStatus,
    getQalitiesByIds,
};

export default qualitiesReducer;
