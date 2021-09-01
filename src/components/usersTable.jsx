import React, {useState} from 'react';
import { paginate } from '../utils/paginate';
import Pagination from './pagination';
import UsersTableRows from './usersTableRows';

const UsersTable = ({ users: allUsers, onUserDelete, onUserBookmarkClick }) => {
    const USERS_COUNT = allUsers.length;
    const PAGE_SIZE = 5;

    const [currentPageNum, setCurrentPageNum] = useState(1);

    const handlePageChange = (pageNum) => {
        setCurrentPageNum(pageNum);
    };

    const users = paginate(allUsers, currentPageNum, PAGE_SIZE);

    return (
        <>
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
            <Pagination
                itemsCount={USERS_COUNT}
                pageSize={PAGE_SIZE}
                currentPageNum={currentPageNum}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default UsersTable;
