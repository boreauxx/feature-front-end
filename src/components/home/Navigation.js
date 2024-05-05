import React from 'react'
import { Navigate as Nav, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

export default function Navigate() {

    const {
        setUser,
        isLogged,
        setIsLogged,
        deleteAllCookies
    } = useAuth();

    const handleLogout = (() => {
        deleteAllCookies();
        setUser(null);
        setIsLogged(false);
        return <Nav replace to='/login' />
    })

    return (
        <header className='header'>
            <div className='logo-cont'>
                <Link to='/home'>X-Fitness Calculator</Link>
            </div>
            {isLogged ?
                <div className='logged-user'>
                    <div className='features'>
                        <Link to='/home'><p>Programs</p></Link>
                        <Link to='/calculator'><p>Calories Calculator</p></Link>
                    </div>
                    <div className='profile'>
                        <Link to='/profile'><p>Profile</p></Link>
                        <Link onClick={handleLogout} replace to='/login'><p>Log out</p></Link>
                    </div>
                </div>
                :
                <div className='guest-user'>
                    
                </div>
            }
        </header>

    )
}