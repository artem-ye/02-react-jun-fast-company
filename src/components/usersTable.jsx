import React from 'react';
import UsersTableRows from './usersTableRows';

const UsersTable = ({users, onUserDelete, onUserBookmarkClick}) => {    
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качетва</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>                
                <UsersTableRows 
                    users={users} 
                    onUserDelete={onUserDelete}
                    onUserBookmarkClick={onUserBookmarkClick}
                />                                
            </tbody>
        </table>
    );    
}
 
export default UsersTable;
