import React, {useState} from 'react';
// import Users from './components/users';
import api from './API/index';
import Pagination from './components/pagination';
import SearchStatus from './components/searchStatus';
import UsersTable from './components/usersTable';

function usersToState(users, activePageNum=1) {
    const USERS_PER_PAGE = 5;
    const pagesCount = Math.ceil(users.length / USERS_PER_PAGE);
    const currentPageNum = Math.min(activePageNum, pagesCount);

    const sliceStart = USERS_PER_PAGE * (currentPageNum-1);
    const sliceEnd = sliceStart + USERS_PER_PAGE;
    const currentPageUsers = users.slice(sliceStart, sliceEnd);

    return {
        pagesCount,
        currentPageNum,
        currentPageUsers,
        users
    }
}

const App = () => {
    const usersInitialState = api.users.fetchAll();
    const [paginationState, setPaginationState] = useState(usersToState(usersInitialState));

    const handlerUerDelete = (userId) => {
        const newUsers = paginationState.users.filter(usr => usr._id !== userId);
        const newState = usersToState(newUsers, paginationState.currentPageNum);
        setPaginationState(newState);
    }

    const handlerUserBookmarkToggle = (userId) => {
        const newUsers = [...paginationState.users];
        const el = newUsers.find(el => el._id === userId);
        el.isFavorite = !el.isFavorite; 
        const newState = usersToState(newUsers, paginationState.currentPageNum);
        setPaginationState(newState);
    }

    const handlerPaginationPageSelect = (pageId) => {
        const newState = usersToState(paginationState.users, pageId);
        setPaginationState(newState);
    }

    return ( 
        <>
            <SearchStatus usersQty={paginationState.users.length}/> 
            <UsersTable 
                users={paginationState.currentPageUsers} 
                onUserDelete={handlerUerDelete}
                onUserBookmarkClick={handlerUserBookmarkToggle}
            />
            <Pagination
                pageCount={paginationState.pagesCount}
                onPageSelect={handlerPaginationPageSelect}
            />
        </>
    );
}
 
export default App;