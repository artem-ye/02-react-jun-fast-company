import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import { logOut } from '../store/users';

const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
    }, []);
    return (
        <h1>
            logout...
        </h1>
    );
};

export default Logout;
