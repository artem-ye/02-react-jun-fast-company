import React from 'react';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react/cjs/react.development';
import qualityService from '../services/quality.service';

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return React.useContext(QualitiesContext);
};

export const QualitiesProvider = ({children}) => {
    const [qualities, setQualities] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchQualities();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function fetchQualities() {
        try {
            const data = await qualityService.get();
            setQualities(data.content);
            setIsLoading(false);
        } catch (err) {
            errorCatcher(err);
        };
    };

    function errorCatcher(error) {
        if (error?.response?.data?.message) {
            const {message} = error.response.data;
            setError(message);
        } else {
            setError('12');
        }
        setIsLoading(false);
    }

    const getQuality = (id) => {
        return qualities.find(el => el._id === id);
    };

    return (
        <QualitiesContext.Provider value={{isLoading, qualities, getQuality}}>
            {children}
        </QualitiesContext.Provider>
    );
};
