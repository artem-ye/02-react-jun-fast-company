import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/ui/navbar';
import Users from './layouts/users';
import Login from './layouts/login';
import Main from './layouts/main';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfessions';
import { QualitiesProvider } from './hooks/useQualities';

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Route path="/login/:type?" exact component={Login}></Route>
                        <Route path="/users/:userId?/:mode?" exact component={Users}></Route>
                    </QualitiesProvider>
                    {/* <Route path="/login/:type?" exact component={Login}></Route>
                    <Route path="/users/:userId?/:mode?" exact component={Users}></Route> */}
                </ProfessionProvider>
                <Route path="/" exact component={Main}></Route>
                <Redirect to="/" />
            </Switch>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default App;
