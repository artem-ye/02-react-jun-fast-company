import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import api from '../API/index';
import UserQualities from './userQualities';
import PropTypes from 'prop-types';

const UserCard = ({userId}) => {
    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(res => {
            setIsLoading(false);
            setUser(res);
        });
    }, []);

    if (isLoading) return (<h3>Loading...</h3>);

    if (!user) return (<h3>User {userId} not found</h3>);

    const handleAllUsers = () => {
        history.push('/users');
    };

    return (
        <div>
            <h2>{user.name}</h2>
            <h4>{user.profession.name}</h4>
            <div>
                <UserQualities qualities={user.qualities}/>
            </div>
            <span>Встретился: {user.completedMeetings}</span>
            <h4>Оценка: {user.rate}</h4>
            <button onClick={handleAllUsers}>Все пользователи</button>
        </div>
    );
};

UserCard.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserCard;