import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/ui/navbar';
import Users from './layouts/users';
import Login from './layouts/login';
import Main from './layouts/main';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfessions';
import { QualitiesProvider } from './hooks/useQualities';
import { AuthProvider } from './hooks/useAuth';

const App = () => {
    return (
        <>
            <AuthProvider>
                <Navbar />
                <Switch>
                    <ProfessionProvider>
                        <QualitiesProvider>

                            <Route path="/login/:type?" exact component={Login}></Route>
                            <Route path="/users/:userId?/:mode?" exact component={Users}></Route>
                            <Route path="/" exact component={Main}></Route>
                            <Redirect to="/" />

                        </QualitiesProvider>
                    </ProfessionProvider>
                </Switch>
            </AuthProvider>
            <ToastContainer/>
        </>
    );
};

export default App;
