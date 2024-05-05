import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'
import { parseToken } from '../services/TokenParser';

export const useAuthentication = () => {
    const { setIsLogged, setUser, getCookie } = useAuth();

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
};
