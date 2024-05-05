import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'

import { axiosService } from '../../services/AxiosService';
import { useAuth } from '../../context/AuthContext';

export default function Home() {

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

    const [programs, setPrograms] = useState([]);
    const [counter, setCounter] = useState(0)
    const [name, setName] = useState('');
    const token = getCookie('token');

    const handleAddProgram = async (e) => {
        e.preventDefault();
        const program = { name };
        const response = await axiosService.addProgram(token, program);
        setCounter(counter + 1);
    }

    const handleRemoveProgram = async (id) => {
        const response = await axiosService.removeProgram(token, id);
        setCounter(counter + 1);
    }

    useEffect(() => {
        const loadPrograms = async () => {
            const response = await axiosService.getAllPrograms(token);
            setPrograms(response.data);
        }
        loadPrograms();
    }, [counter])

    if (!isLogged) {
        <Navigate to='/login' />
    }

    return (
        <div className='home-div'>
            
            <form onSubmit={handleAddProgram} className='prog-form'>
                <label>Protocol name</label>
                <input
                    value={name}
                    name='name'
                    className='form-input'
                    placeholder='Program name'
                    onChange={(e) => setName(e.target.value)} >
                </input>
                <button>Add program</button>
            </form >

            <div className='all-programs'>
                {programs.map(program =>
                    <div div className='program-ui' key={program.id} >
                        <Link to='/program' state={{ id:program.id }} style={{color: 'black'}}>
                            <p>Protocol ID: {program.id}</p>
                            <p>Name: {program.name}</p>
                            <p>Weeks finished: {program.weeks.length}</p>
                        </Link>
                        <button onClick={() => handleRemoveProgram(program.id)}>Delete</button>
                    </div>
                )}
            </div>

        </div >
    )
}