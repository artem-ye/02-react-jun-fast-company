import React from 'react';
import UsersTableRowBookmark from './usersTableRowBookmark';
import UsersTableRowQualities from './usersTableRowQualities';

const UsersTableRows = ({users, onUserDelete, onUserBookmarkClick}) => {
    const renderRow = (user) => {        
        return (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                    <UsersTableRowQualities qualities={user.qualities}/>
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                    <UsersTableRowBookmark 
                        isFavorite={user.isFavorite}
                        onUserBookmarkClick={() => onUserBookmarkClick(user._id)}
                    />                    
                </td>
                <td>
                    <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => {onUserDelete(user._id)}}
                    >delete</button>
                </td>
            </tr>
        );
    };

    return (
        <>
            {users.map(renderRow)}
        </>
    );    
}
 
export default UsersTableRows;