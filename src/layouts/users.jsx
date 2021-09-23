import React from 'react';
import { useParams } from 'react-router';
import UserCard from '../components/userCard';
import UsersList from '../components/usersList';

const UsersLayout = () => {
    const userId = useParams().userId;
    return (
        userId ? <UserCard userId={userId}/> : <UsersList/>
    );
};

export default UsersLayout;
