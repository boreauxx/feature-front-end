import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom';

import { axiosService } from '../../services/AxiosService'
import { useAuth } from '../../context/AuthContext';

export default function Program() {

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

    const location = useLocation();
    const programId = location.state.id;
    const token = getCookie('token');

    const [program, setProgram] = useState({ id: null, name: '', weeks: [] })
    const [counter, setCounter] = useState(0);
    const [isError, setIsError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [exercise, setExercise] = useState({ name: '', kg: '', sets: '', reps: '', date: '' });

    const handleAddExercise = async (e) => {
        e.preventDefault();
        if (!(exercise.name && exercise.kg && exercise.sets && exercise.reps && exercise.date)) {
            setIsError(true);
            setErrorMessage('Please, inform all fields!');
            return;
        }
        try {
            const response = await axiosService.addExercise(token, exercise);
            setExercise({ name: '', kg: '', sets: '', reps: '' });
            setIsError(false);
            setErrorMessage('');
            setCounter(counter + 1);
            console.log(response.data)
            return <Navigate to="/program" />
        }
        catch (error) {
            setIsError(true);
            setErrorMessage(error.message);
        }
    }

    const handleRemoveExercise = async (dayId, exerciseId) => {
        const response = await axiosService.removeExercise(token, dayId, exerciseId);
        setCounter(counter + 1);
        console.log(response.data);
    }

    const handleAddWeek = async () => {
        const response = await axiosService.addWeek(token, programId);
        setCounter(counter + 1);
        console.log(response.data)
    }

    const handleRemoveWeek = async (weekId) => {
        const response = await axiosService.removeWeek(token, weekId, programId);
        setCounter(counter + 1);
        console.log(response.data)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExercise((prevExercise) => ({
            ...prevExercise,
            [name]: value
        }));
    };

    useEffect(() => {
        const loadProgram = async () => {
            const response = await axiosService.getProgram(token, programId);
            setProgram(response.data);
        }
        loadProgram();
    }, [counter])

    if (!isLogged) {
        return <Navigate to='/login' />;
    }

    return (
        <div style={{ backgroundColor: '#50577A', minHeight: 'calc(100vh - 80px)' }}>

            <div className='add-week-div'>
                <button className='add-week-button'
                    onClick={handleAddWeek}>Add week</button>
            </div>

            <div className='add-exercise-div'>
                {errorMessage}
                <form onSubmit={(e) => handleAddExercise(e)}>
                    <div>
                        <input
                            value={exercise.name}
                            name="name"
                            placeholder="Exercise name"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            value={exercise.kg}
                            name="kg"
                            placeholder="Kgs"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            value={exercise.sets}
                            name="sets"
                            placeholder="Sets"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            value={exercise.reps}
                            name="reps"
                            placeholder="Reps"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='base-flex'>
                        <input
                            value={exercise.date}
                            name='date'
                            type='date'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='base-flex'>
                        <button className='add-ex-button'>Add Exercise</button>
                    </div>
                </form>
            </div>

            <div className='week-layout'>
                {program.weeks.map(week =>
                    <div key={week.id} className='week-container'>
                        <div className='week-stats'>
                            <button className='remove-week-button'
                                onClick={() => handleRemoveWeek(week.id)}>Remove week
                            </button>
                            <button className='show-details-button'>Show week details</button>
                        </div>

                        <div className='week-div'>
                            {week.days.map(day =>
                                <div key={day.id} className='day-div'>
                                    <div className='day-stats'>
                                        <p>{day.name}</p>
                                        <p>{day.date}</p>
                                        <p>{day.muscleGroup}</p>
                                    </div>

                                    <div className='all-exercises'>
                                        {day.exercises.map(exercise =>
                                            <div key={exercise.id} className='single-day-ex'>
                                                <p className='ex-name'>Name: {exercise.name}</p>
                                                <p>{exercise.sets} sets of {exercise.reps} with max {exercise.kg} kg.</p>
                                                <button className='remove-ex-button'
                                                    onClick={() => handleRemoveExercise(day.id, exercise.id)}>Remove exercise</button>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}