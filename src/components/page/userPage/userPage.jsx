import React from 'react';
import PropTypes from 'prop-types';
import UserCard from '../../ui/userCard/';

const UserPage = ({userId, mode}) => {
    return (<UserCard userId={userId}/>);
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
