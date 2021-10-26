import React from 'react';
import { useParams } from 'react-router';
import EditUserPage from '../components/page/editUserPage';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';

const UsersLayout = () => {
    const {userId, mode} = useParams();
    if (!userId) {
        return (<UsersListPage/>);
    } else {
        if (mode === 'edit') {
            return (<EditUserPage userId={userId}/>);
        } else {
            return (<UserPage userId={userId}/>);
        }
    }
};

export default UsersLayout;
