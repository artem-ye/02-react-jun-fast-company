import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const NavProfile = () => {
    const {currentUser} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className='me-2'>{currentUser.name}</div>
                <div className="me-2">
                    <img className='img-fluid rounded-circle' style={{width: '50px'}} src={currentUser.image}/>
                </div>
            </div>
            <div className={'w-100 dropdown-menu ' + (isOpen ? 'show' : '')}>
                <Link to={`/users/${currentUser._id}`} className='dropdown-item'>Profile</Link>
                <Link to='/logout' className='dropdown-item'>Logout</Link>
            </div>
        </div>
    );
};

export default NavProfile;
