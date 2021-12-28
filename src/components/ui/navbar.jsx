import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import NavProfile from './navProfile';

const Navbar = () => {
    const {currentUser} = useAuth();

    console.log('Auth user', currentUser);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='container-fluid'>
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" aria-current="page">Main</Link>
                    </li>
                    {currentUser &&
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">Users</Link>
                        </li>
                    }
                </ul>

                <div className='d-flex'>
                    {currentUser
                        ? <NavProfile/>
                        : (
                            <li className="nav nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
