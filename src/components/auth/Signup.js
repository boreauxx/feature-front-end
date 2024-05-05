import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom'

import { axiosService } from '../../services/AxiosService';
import { parseToken } from '../../services/TokenParser'
import { useAuth } from '../../context/AuthContext';

export default function Signup() {

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

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isError, setIsError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(username && password && email)) {
      setIsError(true);
      setErrorMessage('Please, inform all fields!')
      return
    }
    const user = { username, password, email };
    try {
      const response = await axiosService.signup(user);
      const { token } = response.data;
      const data = parseToken(token);
      setCookie('token', token, { expires: 1 })
      setCookie('data', JSON.stringify(data), { expires: 1 });
      setUser(data);
      setIsLogged(true);
      setUsername('');
      setPassword('');
      setEmail('');
      setIsError(false);
      setErrorMessage('');
      return <Navigate to="/home" />
    }
    catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    }
  }

  if (isLogged) {
    return <Navigate to='/' />
  }

  return (
    <div className='auth-div'>
      <div className='auth-cont'>
        {isError && <div>{errorMessage}</div>}
        <form onSubmit={handleSubmit} className='auth-form'>
          <input
            value={username}
            name='username'
            className='form-input'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            value={password}
            name='password'
            className='form-input'
            placeholder='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            value={email}
            name='email'
            className='form-input'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type='submit'>Signup</button>
        </form>
        <div className='form-message'>
          {`Already have an account? `} <NavLink to="/login" color='violet' as={NavLink} style={{color:'black'}}>Login</NavLink>
        </div>
      </div>
    </div>
  )

}