import React, {useState, useEffect} from 'react';
import { paginate } from '../utils/paginate';
import GroupList from './groupList';
import Pagination from './pagination';
import SearchStatus from './searchStatus';
import UsersTableRows from './usersTableRows';
import api from '../API/index';

const UsersTable = ({ users: allUsers, onUserDelete, onUserBookmarkClick }) => {
    // Professions filter
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const clearUsersFilter = () => {
        setSelectedProf(undefined);
    };

    // Pagination
    const PAGE_SIZE = 8;
    const [currentPageNum, setCurrentPageNum] = useState(1);
    const handlePageChange = (pageNum) => {
        setCurrentPageNum(pageNum);
    };

    // Filtered usr list
    const filteredUsers = (selectedProf
        ? allUsers.filter(
            usr => JSON.stringify(usr.profession) === JSON.stringify(selectedProf)
        )
        : allUsers
    );
    const FILTERED_USERS_COUNT = filteredUsers.length;

    useEffect(() => {
        setCurrentPageNum(1);
    }, [selectedProf]);

    // Recalculate pages count and current page num
    const PAGES_COUNT = Math.ceil(FILTERED_USERS_COUNT / PAGE_SIZE);
    const CURRENT_PAGE_NUM = currentPageNum > PAGES_COUNT ? PAGES_COUNT : currentPageNum;
    const users = paginate(filteredUsers, CURRENT_PAGE_NUM, PAGE_SIZE);

    // Fetch professions
    useEffect(() => {
        api.professions.fetchAll().then(data =>
            setProfessions(data)
        );
    }, []);

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button className="btn btn-secondary mt-2" onClick={clearUsersFilter}>Очистить</button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus usersQty={FILTERED_USERS_COUNT}/>
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
                <div className="d-flex justify-content-center">
                    <Pagination
                        pagesCount={PAGES_COUNT}
                        currentPageNum={CURRENT_PAGE_NUM}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default UsersTable;
