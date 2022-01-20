import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/ui/navbar';
import Users from './layouts/users';
import Login from './layouts/login';
import Logout from './layouts/logout';
import Main from './layouts/main';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import { useEffect } from 'react/cjs/react.development';
import { useDispatch } from 'react-redux';
import { loadQualitiesList } from './store/qualities';
import { loadProfessionsList } from './store/professions';
import { loadUsersList } from './store/users';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProfessionsList());
        dispatch(loadQualitiesList());
        dispatch(loadUsersList());
    }, []);

    return (
        <>
            <ToastContainer/>
            <AuthProvider>
                <Navbar />
                <Switch>
                    <ProtectedRoute path="/users/:userId?/:mode?" component={Users}></ProtectedRoute>
                    <Route path="/login/:type?" component={Login}></Route>
                    <Route path="/logout" component={Logout}></Route>
                    <Route path="/" exact component={Main}></Route>
                </Switch>
            </AuthProvider>
        </>
    );
};

export default App;
