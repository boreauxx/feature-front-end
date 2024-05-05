import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { axiosService } from '../../services/AxiosService';
import { useAuth } from '../../context/AuthContext';

export default function Calculator() {

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

    const [name, setName] = useState('')
    const [fats, setFats] = useState('')
    const [carbs, setCarbs] = useState('')
    const [protein, setProtein] = useState('')
    const [calories, setCalories] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState('');


    const [items, setItems] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [counter, setCounter] = useState(0);
    const token = getCookie('token');


    useEffect(() => {
        const loadItems = async () => {
            const list = await axiosService.getAllItems(token);
            let currentList = check('currentItems') ? JSON.parse(getCookie('currentItems')) : [];
            setItems(list.data);
            setCurrentItems(currentList);
        }
        loadItems();
    }, [counter])

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!(name && fats && carbs && protein && calories)) {
            setIsError(true);
            setErrorMessage('Please, inform all fields!')
            return
        }
        const item = { name, fats, carbs, protein, calories };
        try {
            const response = await axiosService.addItem(token, item);
            setCounter(counter + 1);
            setName('')
            setFats('')
            setCarbs('')
            setProtein('')
            setCalories('')
            setIsError(false);
            setErrorMessage('');
            return <Navigate to="/calculator" />
        }
        catch (error) {
            setIsError(true);
            setErrorMessage(error.message);
        }
    }

    const handleRemoveItem = async (id) => {
        const response = await axiosService.removeItem(token, id);
        setCounter(counter + 1);
    }

    const handleSelectItem = (item) => {
        let currentList = check('currentItems') ? JSON.parse(getCookie('currentItems')) : [];
        currentList.push(item);
        setCookie('currentItems', JSON.stringify(currentList), { expires: 1 });
        setCurrentItems(currentList);
        setCounter(counter + 1);
    }

    if (!isLogged) {
        return <Navigate replace to="/login" />
    }

    return (
        <div>

            <div className='item-cont'>
                <form className='add-item'
                    onSubmit={handleAddItem}>
                    <div>
                        <label>Name:</label>
                        <input
                            value={name}
                            name='username'
                            className='form-input'
                            placeholder='Item name'
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Fats:</label>
                        <input
                            value={fats}
                            name='username'
                            className='form-input'
                            placeholder='Fats per quantity'
                            onChange={(e) => setFats(e.target.value)} />
                    </div>
                    <div>
                        <label>Carbs:</label>
                        <input
                            value={carbs}
                            name='username'
                            className='form-input'
                            placeholder='Carbs per quantity'
                            onChange={(e) => setCarbs(e.target.value)} />
                    </div>
                    <div>
                        <label>Protein:</label>
                        <input
                            value={protein}
                            name='username'
                            className='form-input'
                            placeholder='Protein per quantity'
                            onChange={(e) => setProtein(e.target.value)} />
                    </div>
                    <div>
                        <label>Calories:</label>
                        <input
                            value={calories}
                            name='username'
                            className='form-input'
                            placeholder='Calories per quantity'
                            onChange={(e) => setCalories(e.target.value)} />
                    </div>
                    <button>Add Item</button>
                </form>

                <div className='all-items'>
                    {items.map(item =>
                        <div className='item-frame'>
                            <ul key={item.id}>
                                <li>{item.name}</li>
                                <li>{item.fats}g. fats</li>
                                <li>{item.carbs}g. carbs</li>
                                <li>{item.protein}g. protein</li>
                                <li>{item.calories}cal. total calories</li>
                                <button onClick={() => handleSelectItem(item)}>select item</button>
                                <button onClick={() => handleRemoveItem(item.id)}>remove item</button>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className='current-items'>
                {currentItems.map(item =>
                    <div>
                        <ul>
                            <li key={item.id}>
                                <li>{item.name}</li>
                                <li>{item.fats}</li>
                                <li>{item.carbs}</li>
                                <li>{item.protein}</li>
                                <li>{item.calories}</li>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <div>
                <p>Total fats: </p>
                <p>Total carbs: </p>
                <p>Total protein: </p>
                <p>Total calories: </p>
            </div>

        </div>
    )
}