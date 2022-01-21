import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIsLoggedIn } from '../../store/users';
import NavProfile from './navProfile';

const Navbar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='container-fluid'>
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" aria-current="page">Main</Link>
                    </li>
                    {isLoggedIn &&
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">Users</Link>
                        </li>
                    }
                </ul>

                <div className='d-flex'>
                    {isLoggedIn
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
