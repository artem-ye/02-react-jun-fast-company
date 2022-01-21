import React from 'react';
import { useParams } from 'react-router';

import EditUserPage from '../components/page/editUserPage';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import UsersLoader from '../components/ui/hoc/usersLoader';
import { UserProvider } from '../hooks/useUsers';

const UsersLayout = () => {
    const {userId, mode} = useParams();
    // const dataLoadedStatus = useSelector(getDataLoadedStatus());
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!dataLoadedStatus) {
    //         dispatch(loadUsersList());
    //     }
    // }, []);

    // if (!dataLoadedStatus) {
    //     return 'loading...';
    // }

    const childComponent = () => {
        if (!userId) {
            return (<UsersListPage/>);
        } else {
            if (mode === 'edit') {
                return (<EditUserPage userId={userId}/>);
            } else {
                return (<UserPage userId={userId}/>);
            }
        }
    };

    return (
        <UsersLoader>
            <UserProvider>
                {childComponent()}
            </UserProvider>
        </UsersLoader>
    );
};

export default UsersLayout;
