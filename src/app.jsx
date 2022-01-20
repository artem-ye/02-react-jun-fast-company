import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/ui/navbar';
import Users from './layouts/users';
import Login from './layouts/login';
import Logout from './layouts/logout';
import Main from './layouts/main';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfessions';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import { useEffect } from 'react/cjs/react.development';
import { useDispatch } from 'react-redux';
import { loadQualitiesList } from './store/qualities';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    return (
        <>
            <ToastContainer/>
            <AuthProvider>
                <Navbar />
                <Switch>
                    <ProfessionProvider>
                        <ProtectedRoute path="/users/:userId?/:mode?" component={Users}></ProtectedRoute>
                        <Route path="/login/:type?" component={Login}></Route>
                        <Route path="/logout" component={Logout}></Route>
                        <Route path="/" exact component={Main}></Route>
                    </ProfessionProvider>
                </Switch>
            </AuthProvider>
        </>
    );
};

export default App;
