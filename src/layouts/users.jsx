import React from 'react';
import { useParams } from 'react-router';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';

const UsersLayout = () => {
    const userId = useParams().userId;
    return (
        userId ? <UserPage userId={userId}/> : <UsersListPage/>
    );
};

export default UsersLayout;
