import React, {useState} from 'react';
import api from '../API/index';

const Users = () => {
    const usersInitialState = api.users.fetchAll();
    const [users, setUsers] = useState(usersInitialState);

    const deleteUserHandler = (id) => {
        setUsers(users.filter(usr => usr._id !== id));
    }

    const renderTable = () => {
        const userToTableRow = (user) => {
            const userQualityToBadge = quality => {
                return (
                    <span 
                        key={quality._id} 
                        className={`badge bg-${quality.color} m-1`}
                    >
                        {quality.name}
                    </span>
                );
            };

            return (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                        { user.qualities.map(userQualityToBadge) }            
                    </td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}</td>
                    <td> 
                        <button className="btn btn-sm btn-danger" onClick={() => {deleteUserHandler(user._id)}}>delete</button> 
                    </td>
                </tr>
            );
        };

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качетва</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    { users.map(userToTableRow) }
                </tbody>
            </table>
        );
    };

    return (
        <>
            <span className='badge bg-primary'>Users</span>
            {renderTable()}
        </>
    );
}
 
export default Users;