import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/ui/navbar';
import Users from './layouts/users';
import Login from './layouts/login';
import Logout from './layouts/logout';
import Main from './layouts/main';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/common/protectedRoute';
import AppLoader from './components/ui/hoc/appLoader';

const App = () => {
    return (
        <AppLoader>
            <ToastContainer/>
            <Navbar />
            <Switch>
                <ProtectedRoute path="/users/:userId?/:mode?" component={Users}></ProtectedRoute>
                <Route path="/login/:type?" component={Login}></Route>
                <Route path="/logout" component={Logout}></Route>
                <Route path="/" exact component={Main}></Route>
            </Switch>
        </AppLoader>
    );
};

export default App;
