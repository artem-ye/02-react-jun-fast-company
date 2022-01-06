import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import InfoCard from './userInfo/infoCard';
import QualitiesCard from './userInfo/qualitiesCard';
import MeetingsCard from './userInfo/meetingsCard';
import CommentsList from '../../common/comments/commentsList';
import { useUsers } from '../../../hooks/useUsers';
import { CommentsProvider } from '../../../hooks/useComments';

const UserCard = ({userId}) => {
    const history = useHistory();
    const {getUserById} = useUsers();
    const user = getUserById(userId);

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
                    <CommentsProvider>
                        <CommentsList userId={userId}/>
                    </CommentsProvider>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserCard;
