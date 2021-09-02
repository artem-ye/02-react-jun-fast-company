import React, {useState} from 'react';
import { paginate } from '../utils/paginate';
import Pagination from './pagination';
import UsersTableRows from './usersTableRows';

const UsersTable = ({ users: allUsers, onUserDelete, onUserBookmarkClick }) => {
    // Pagination
    const [currentPageNum, setCurrentPageNum] = useState(1);

    const handlePageChange = (pageNum) => {
        setCurrentPageNum(pageNum);
    };

    const PAGE_SIZE = 5;
    const PAGES_COUNT = Math.ceil(allUsers.length / PAGE_SIZE);
    const CURRENT_PAGE_NUM = currentPageNum > PAGES_COUNT ? PAGES_COUNT : currentPageNum;
    const users = paginate(allUsers, CURRENT_PAGE_NUM, PAGE_SIZE);

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
                pagesCount={PAGES_COUNT}
                currentPageNum={CURRENT_PAGE_NUM}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default UsersTable;
