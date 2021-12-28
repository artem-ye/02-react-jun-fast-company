import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import { useAuth } from '../hooks/useAuth';

const Logout = () => {
    const {logout} = useAuth();
    useEffect(() => {
        logout();
    }, []);
    return (
        <h1>
            logout...
        </h1>
    );
};

export default Logout;
