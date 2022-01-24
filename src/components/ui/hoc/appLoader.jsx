import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfessionsList } from '../../../store/professions';
import { loadQualitiesList } from '../../../store/qualities';
import { getDataLoadedStatus, getIsLoggedIn, loadUsersList } from '../../../store/users';

const AppLoader = ({children}) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isDataLoaded = useSelector(getDataLoadedStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProfessionsList());
        dispatch(loadQualitiesList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);

    if (!isDataLoaded) {
        console.log('loading...');
    }

    return children;
};

export default AppLoader;
