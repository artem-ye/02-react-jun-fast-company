import React from 'react';
import Users from './components/users';

// import React, {useState, useEffect} from 'react';
// import api from './API/index';

const App = () => {
    // const [users, setUsers] = useState([]);

    // const deleteUserHandler = (userId) => {
    //     setUsers(users.filter(usr => usr._id !== userId));
    // };

    // useEffect(() => {
    //     api.users.fetchAll().then(setUsers);
    // }, []);

    // const handlerUserBookmarkToggle = (userId) => {
    //     const newUsersState = [...users];
    //     const el = newUsersState.find(el => el._id === userId);
    //     el.isFavorite = !el.isFavorite;
    //     setUsers(newUsersState);
    // };

    return (
        // <>
        //     <Users
        //         users={users}
        //         onUserDelete={deleteUserHandler}
        //         onUserBookmarkClick={handlerUserBookmarkToggle}
        //     />
        // </>
        <Users/>
    );
};

export default App;
