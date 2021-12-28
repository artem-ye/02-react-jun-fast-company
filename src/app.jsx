import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/ui/navbar';
import Users from './layouts/users';
import Login from './layouts/login';
import Logout from './layouts/logout';
import Main from './layouts/main';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfessions';
import { QualitiesProvider } from './hooks/useQualities';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';

const App = () => {
    return (
        <>
            <AuthProvider>
                <Navbar />
                <Switch>
                    <ProfessionProvider>
                        <QualitiesProvider>

                            <ProtectedRoute path="/users/:userId?/:mode?" component={Users}></ProtectedRoute>
                            <Route path="/login/:type?" component={Login}></Route>
                            <Route path="/logout" component={Logout}></Route>
                            <Route path="/" exact component={Main}></Route>
                            {/* <Redirect to="/" /> */}

                        </QualitiesProvider>
                    </ProfessionProvider>
                </Switch>
            </AuthProvider>
            <ToastContainer/>
        </>
    );
};

export default App;
