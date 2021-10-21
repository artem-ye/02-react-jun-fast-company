import React from 'react';
// import { useHistory } from 'react-router';
// import api from '../../../API/index';
// import UserQualities from '../../ui/qualities/userQualities';
import PropTypes from 'prop-types';
import UserCard from '../../ui/userCard';
import UserEditForm from '../../ui/userEditForm';

const UserPage = ({userId, mode}) => {
    if (mode === 'edit') {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className='col-md-6 offset-md-3 p-4 shadow'>
                        <UserEditForm userId={userId}/>
                    </div>
                </div>
            </div>
        );
    }

    return (<UserCard userId={userId}/>);

    // console.log('Mode is', mode);

    // const [user, setUser] = useState(undefined);
    // const [isLoading, setIsLoading] = useState(true);
    // const history = useHistory();

    // useEffect(() => {
    //     setIsLoading(true);
    //     api.users.getById(userId).then(res => {
    //         setIsLoading(false);
    //         setUser(res);
    //     });
    // }, []);

    // if (isLoading) return (<h3>Loading...</h3>);

    // if (!user) return (<h3>User {userId} not found</h3>);

    // const handleAllUsers = () => {
    //     history.push('/users');
    // };

    // return (
    //     <div>
    //         <h2>{user.name}</h2>
    //         <h4>{user.profession.name}</h4>
    //         <div>
    //             <UserQualities qualities={user.qualities}/>
    //         </div>
    //         <span>Встретился: {user.completedMeetings}</span>
    //         <h4>Оценка: {user.rate}</h4>
    //         <button onClick={handleAllUsers}>Все пользователи</button>
    //     </div>
    // );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired,
    mode: PropTypes.string
};

export default UserPage;
