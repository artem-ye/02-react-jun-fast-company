import React from 'react';
import UsersTableRows from './usersTableRows';
import PropTypes from 'prop-types';

const UsersTable = ({users, onUserDelete, onUserBookmarkClick, onSort}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => onSort('name')} scope="col">Имя</th>
                    <th scope="col">Качетва</th>
                    <th onClick={() => onSort('profession.name')} scope="col">Профессия</th>
                    <th onClick={() => onSort('completedMeetings')} scope="col">Встретился, раз</th>
                    <th onClick={() => onSort('rate')} scope="col">Оценка</th>
                    <th onClick={() => onSort('bookmark')} scope="col">Избранное</th>
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
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onUserDelete: PropTypes.func.isRequired,
    onUserBookmarkClick: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
};

export default UsersTable;
