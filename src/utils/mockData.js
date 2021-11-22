/* eslint-disable no-useless-computed-key */
import { useEffect, useState } from 'react';
import professions from '../mockData/professions.json';
import qualities from '../mockData/qualities.json';
import users from '../mockData/users.json';
import httpService from '../services/http.service';

const useMockData = () => {
    const STATUS = {
        idle: 'Not started',
        pending: 'Updating',
        success: 'Update completed',
        error: 'Error occurred'
    };

    const [error, setError] = useState(null);
    const [requestCounter, setRequestCounter] = useState(0);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(STATUS.idle);

    const TOTAL_REQUEST_NEEDED = professions.length + qualities.length + users.length;
    const incrementRequestCounter = () => {
        setRequestCounter(prev => prev+1);
    };

    const updateProgress = () => {
        if (requestCounter === TOTAL_REQUEST_NEEDED) {
            setStatus(STATUS.success);
        } else if (status === STATUS.idle && requestCounter > 0) {
            setStatus(STATUS.pending);
        };

        const progressNewState = Math.floor((requestCounter / TOTAL_REQUEST_NEEDED) * 100);
        setProgress(() => progressNewState);
    };

    useEffect(() => {
        updateProgress();
    }, [requestCounter]);

    async function initDb() {
        setRequestCounter(0);

        const mocDataSet = {
            ['profession/']: professions,
            ['user/']: users,
            ['quality/']: qualities
        };

        try {
            for (const [baseUri, data] of Object.entries(mocDataSet)) {
                for (const dataEntry of data) {
                    await httpService.put(baseUri+dataEntry._id, dataEntry);
                    incrementRequestCounter();
                }
            }
        } catch (err) {
            setError(err);
            setStatus(STATUS.error);
        }
    };

    return {initialize: initDb, error, progress, status};
};

export default useMockData;
