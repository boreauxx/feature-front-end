import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom'

import { axiosService } from '../../services/AxiosService';
import { parseToken } from '../../services/TokenParser'
import { useAuth } from '../../context/AuthContext';

export default function Authenticate() {

    const {
        user,
        setUser,
        isLogged,
        setIsLogged,
        check,
        getCookie,
        getAllCookies,
        setCookie,
        deleteCookie,
        deleteAllCookies
    } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!(username && password)) {
            setIsError(true);
            setErrorMessage('Please, inform all fields!')
            return
        }
        const user = { username, password }
        try {
            const response = await axiosService.authenticate(user);
            const { token } = response.data;
            const data = parseToken(token);
            setCookie('token', token, { expires: 1 })
            setCookie('data', JSON.stringify(data), { expires: 1 });
            setUser(data);
            setIsLogged(true);
            setUsername('');
            setPassword('');
            setIsError(false);
            setErrorMessage('');
            return <Navigate to="/home" />;
        }
        catch (error) {
            setIsError(true);
            setErrorMessage(error.message);
        }
    }

    if (isLogged) {
        return <Navigate to='/home' />
    }

    return (
        <div className='auth-div'>
            <div className='auth-cont'>
                {isError && <div>{errorMessage}</div>}
                <form onSubmit={handleSubmit} className='auth-form'>
                    <input
                        name='username'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        name='password'
                        placeholder='Password'
                        value={password}
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Log in</button>
                </form>
                <div>
                    {`Don't have an account?`} <NavLink to="/signup" color='violet' as={NavLink} style={{color:'black'}}>Sign up</NavLink>
                </div>
            </div>
        </div>
    )
}