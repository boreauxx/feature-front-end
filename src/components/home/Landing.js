import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom'

export default function Landing(){

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

    if(isLogged){
        return <Navigate replace to='/home'/>
    }

    return (
        <div className="landing-div">
            <p>Please <Link to='/login'>Login</Link></p> 
            <p>or</p>
            <p><Link to='/signup'>Sign up</Link></p>
        </div>
    )
}