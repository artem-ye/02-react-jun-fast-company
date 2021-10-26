import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
// import UserQualities from '../qualities/userQualities';
import API from '../../../API';
import InfoCard from './userInfo/infoCard';
import QualitiesCard from './userInfo/qualitiesCard';
import MeetingsCard from './userInfo/meetingsCard';
import CommentsList from '../../common/comments/commentsList';
// import CommentsList from './comments/commentsList';

const UserCard = ({userId}) => {
    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        API.users.getById(userId).then(res => {
            setIsLoading(false);
            setUser(res);
        });
    }, []);

    if (isLoading) return (<h3>Loading...</h3>);

    if (!user) return (<h3>User {userId} not found</h3>);

    const handleEditUser = () => {
        history.push(history.location.pathname + '/edit');
    };

    return (

        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <InfoCard user={user} onEditClick={handleEditUser}/>
                    <QualitiesCard qualities={user.qualities}/>
                    <MeetingsCard quantity={user.completedMeetings}></MeetingsCard>
                </div>
                <div className="col-md-8">
                    <CommentsList userId={userId}/>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserCard;
