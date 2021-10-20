import React from 'react';
import { useParams } from 'react-router';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';

const UsersLayout = () => {
    const {userId, mode} = useParams();
    return (
        userId ? <UserPage userId={userId} mode={mode}/> : <UsersListPage/>
    );
};

export default UsersLayout;
