import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataLoadedStatus, loadUsersList } from '../../../store/users';

const UsersLoader = ({children}) => {
    const dataLoadedStatus = useSelector(getDataLoadedStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataLoadedStatus) {
            dispatch(loadUsersList());
        }
    }, []);

    if (!dataLoadedStatus) {
        return 'loading...';
    }
    return children;
};

export default UsersLoader;
