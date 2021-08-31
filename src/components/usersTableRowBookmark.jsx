import React from 'react'

const UsersTableRowBookmark = ({isFavorite, onUserBookmarkClick}) => {
    return ( 
        <i 
            className={"bi bi-bookmark" + (isFavorite ? '-heart-fill' : '')}
            onClick={onUserBookmarkClick}
        ></i> 
    );
}
 
export default UsersTableRowBookmark;