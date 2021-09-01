import React, {useState} from 'react';
// import Users from './components/users';
import api from './API/index';
import SearchStatus from './components/searchStatus';
import UsersTable from './components/usersTable';

const App = () => {
    const usersInitialState = api.users.fetchAll();
    const [users, setUsers] = useState(usersInitialState);

    const deleteUserHandler = (userId) => {
        setUsers(users.filter(usr => usr._id !== userId));
    };

    const handlerUserBookmarkToggle = (userId) => {
        const newUsersState = [...users];
        const el = newUsersState.find(el => el._id === userId);
        el.isFavorite = !el.isFavorite;
        setUsers(newUsersState);
    };

    return (
        <>
            <SearchStatus usersQty={users.length}/>
            <UsersTable
                users={users}
                onUserDelete={deleteUserHandler}
                onUserBookmarkClick={handlerUserBookmarkToggle}
            />
        </>
    );
};

export default App;
