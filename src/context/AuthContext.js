import React, { useState, useEffect, useContext } from 'react'

import useCookies from '@js-smart/react-cookie-service';
import { parseToken } from '../services/TokenParser'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const {
        check,
        getCookie,
        getAllCookies,
        setCookie,
        deleteCookie,
        deleteAllCookies
    } = useCookies();

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            setIsLogged(true);
            const data = parseToken(token);
            setUser(data);
        } else {
            setIsLogged(false);
            setUser(null);
        }
    }, []);

    const auth = {
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
    }

    return (
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>
    )
}