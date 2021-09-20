import React from 'react';
import PropTypes from 'prop-types';

const UsersTableRowBookmark = ({user, onUserBookmarkClick}) => {
    const {isFavorite, _id} = user;

    return (
        <i
            className={'bi bi-bookmark' + (isFavorite ? '-heart-fill' : '')}
            onClick={ () => onUserBookmarkClick(_id) }
        ></i>
    );
};

UsersTableRowBookmark.propTypes = {
    user: PropTypes.object.isRequired,
    onUserBookmarkClick: PropTypes.func.isRequired
};

export default UsersTableRowBookmark;
