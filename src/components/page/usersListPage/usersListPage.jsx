import React, {useState, useEffect} from 'react';
import { paginate } from '../../../utils/paginate';
// import GroupList from './groupList';
import GroupList from '../../common/groupList';
import Pagination from '../../common//pagination';
import SearchStatus from '../../ui/searchStatus';
import api from '../../../API/index';
import UsersTable from '../../ui/usersTable';
import _ from 'lodash';

const UsersListPage = () => {
    const [allUsers, setAllUsers] = useState([]);

    const handleUserDelete = (userId) => {
        setAllUsers(allUsers.filter(usr => usr._id !== userId));
    };

    useEffect(() => {
        api.users.fetchAll().then(setAllUsers);
    }, []);

    const handlerUserBookmarkToggle = (userId) => {
        const newUsersState = [...allUsers];
        const el = newUsersState.find(el => el._id === userId);
        el.isFavorite = !el.isFavorite;
        setAllUsers(newUsersState);
    };

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

    // Sorting
    const [sortParams, setSortParams] = useState({iter: 'name', order: 'asc'});
    const handleSort = (params) => {
        setSortParams(params);
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
    const sortedUsers = _.orderBy(filteredUsers, sortParams.iter, sortParams.order);
    const users = paginate(sortedUsers, CURRENT_PAGE_NUM, PAGE_SIZE);

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

                <UsersTable
                    users={users}
                    onUserDelete={handleUserDelete}
                    onUserBookmarkClick={handlerUserBookmarkToggle}
                    sortParams={sortParams}
                    onSort={handleSort}
                />

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

export default UsersListPage;
