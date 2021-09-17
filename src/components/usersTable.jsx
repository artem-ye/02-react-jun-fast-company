import React from 'react';
// import UsersTableRows from './usersTableRows';
import PropTypes from 'prop-types';
// import TableHeader from './tableHeader';
// import TableBody from './tableBody';
import UsersTableRowBookmark from './usersTableRowBookmark';
import UsersTableRowQualities from './usersTableRowQualities';
import Table from './table';

const UsersTable = ({users, onUserDelete, onUserBookmarkClick, sortParams, onSort}) => {
    const columns = {
        name: {name: 'Имя', path: 'name'},
        qualities: {
            name: 'Качетва',
            path: undefined,
            component: (user) => (
                <UsersTableRowQualities qualities={user.qualities}/>
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
        <>
            <Table {...{sortParams, onSort, columns, data: users}}/>
            {/* <TableHeader {...{sortParams, onSort, columns}}/>
            <TableBody
                {...{columns, data: users}}
            /> */}
        </>
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
