import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/navbar';
import Users from './layouts/users';
import Login from './layouts/login';
import Main from './layouts/main';

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Main}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/users/:userId?" exact component={Users}></Route>
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default App;
