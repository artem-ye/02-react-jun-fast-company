import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Table from '../common/table';
import Bookmark from '../common/bookmark';
// import UserQualities from '../ui/qualities/userQualities';
import Qualities from './qualities';
import Profession from './profession';

const UsersTable = ({users, onUserBookmarkClick, sortParams, onSort}) => {
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
                <Qualities qualities={user.qualities}/>
            )
        },
        profession: {
            name: 'Профессия',
            path: undefined,
            component: (user) => (
                <Profession id={user.profession}/>
            )
        },

        completedMeetings: {name: 'Встретился, раз', path: 'completedMeetings'},
        rate: {name: 'Оценка', path: 'rate'},
        bookmark: {
            name: 'Избранное',
            path: 'isFavorite',
            component: (user) => (
                <Bookmark
                    user={user}
                    onUserBookmarkClick={onUserBookmarkClick}
                />
            )
        }
        // ,
        // del: {
        //     component: (user) => (
        //         <button
        //             className="btn btn-sm btn-danger"
        //             onClick={() => { onUserDelete(user._id); }}
        //         >delete</button>
        //     )
        // },
    };

    return (
        <Table {...{sortParams, onSort, columns, data: users}}></Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onUserBookmarkClick: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    sortParams: PropTypes.object.isRequired,
};

export default UsersTable;
