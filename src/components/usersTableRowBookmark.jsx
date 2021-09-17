import React from 'react';

const UsersTableRowBookmark = ({user, onUserBookmarkClick}) => {
    const {isFavorite, _id} = user;

    return (
        <i
            className={'bi bi-bookmark' + (isFavorite ? '-heart-fill' : '')}
            onClick={ () => onUserBookmarkClick(_id) }
        ></i>
    );
};

export default UsersTableRowBookmark;
