import React from 'react';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react/cjs/react.development';
import professionService from '../services/profession.service';

const ProfessionContext = React.createContext(null);

export const useProfessions = () => {
    return React.useContext(ProfessionContext);
};

export const ProfessionProvider = ({children}) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfessions();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function fetchProfessions() {
        try {
            const data = await professionService.get();
            setProfessions(data.content);
            setIsLoading(false);
        } catch (err) {
            errorCatcher(err);
            setIsLoading(false);
        }
    }

    function errorCatcher(error) {
        if (error?.response?.data?.message) {
            const {message} = error.response.data;
            setError(message);
        } else {
            setError(error);
        }
        setIsLoading(false);
    }

    function getProfession(id) {
        return professions.find(el => el._id === id);
    }

    return (
        <ProfessionContext.Provider value={{isLoading, professions, getProfession}}>
            {children}
        </ProfessionContext.Provider>
    );
};
