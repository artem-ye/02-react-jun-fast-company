import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({user, onUserBookmarkClick}) => {
    const {isFavorite, _id} = user;

    return (
        <i
            className={'bi bi-bookmark' + (isFavorite ? '-heart-fill' : '')}
            onClick={ () => onUserBookmarkClick(_id) }
        ></i>
    );
};

Bookmark.propTypes = {
    user: PropTypes.object.isRequired,
    onUserBookmarkClick: PropTypes.func.isRequired
};

export default Bookmark;
