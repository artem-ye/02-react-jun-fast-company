import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Table from './table';
import UsersTableRowBookmark from './usersTableRowBookmark';
import UserQualities from './userQualities';

const UsersTable = ({users, onUserDelete, onUserBookmarkClick, sortParams, onSort}) => {
    const columns = {
        name: {
            name: 'Имя',
            path: 'name',
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: 'Качетва',
            path: undefined,
            component: (user) => (
                <UserQualities qualities={user.qualities}/>
            )
        },
        profession: {name: 'Профессия', path: 'profession.name'},
        completedMeetings: {name: 'Встретился, раз', path: 'completedMeetings'},
        rate: {name: 'Оценка', path: 'rate'},
        bookmark: {
            name: 'Избранное',
            path: 'isFavorite',
            component: (user) => (
                <UsersTableRowBookmark
                    user={user}
                    onUserBookmarkClick={onUserBookmarkClick}
                />
            )
        },
        del: {
            component: (user) => (
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => { onUserDelete(user._id); }}
                >delete</button>
            )
        },
    };

    return (
        <Table {...{sortParams, onSort, columns, data: users}}></Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onUserDelete: PropTypes.func.isRequired,
    onUserBookmarkClick: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    sortParams: PropTypes.object.isRequired,
};

export default UsersTable;
