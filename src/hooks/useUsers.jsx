import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import userService from '../services/user.service';

const UserContext = React.createContext([]);

export const useUsers = () => {
    return useContext(UserContext);
};

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function getUsers() {
        try {
            const {content} = await userService.get();
            setUsers(content);
            setIsLoading(false);
        } catch (err) {
            errorCatcher(err);
        };
    }

    function getUserById(userId) {
        return users.find((usr) => usr._id === userId);
    }

    function errorCatcher(error) {
        if (error?.response?.data?.message) {
            const {message} = error.response.data;
            setError(message);
        } else {
            setError('12');
        }
        setIsLoading(false);
    }

    return (
        <UserContext.Provider value={{users, getUserById}}>
            {!isLoading ? children : <h1>loading...</h1>}
        </UserContext.Provider>
    );
};
