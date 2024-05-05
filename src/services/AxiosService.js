import axios from 'axios'

export const axiosService = {
    signup,
    authenticate,
    getAllPrograms,
    getProgram,
    addProgram,
    removeProgram,
    addWeek,
    removeWeek,
    setMuscleGroup,
    addExercise,
    removeExercise,
    getAllItems,
    addItem,
    removeItem
}

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post['Content-Type'] = 'application/json'

function signup(user) {
    return axios.post('/api/auth/signup', user);
}

function authenticate(user) {
    return axios.post('/api/auth/authenticate', user)
}


function getAllPrograms(token) {
    return axios.get('/api/programs/all', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function getProgram(token, id) {
    return axios.get('/api/programs/specific', {
        params: { id },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function addProgram(token, program) {
    return axios.post('/api/programs/add', program, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function removeProgram(token, id) {
    return axios.post('/api/programs/remove', { id }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function addWeek(token, id) {
    return axios.post('api/weeks/add', { id }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function removeWeek(token, weekId, programId) {
    return axios.post('api/weeks/remove', { weekId, programId }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function setMuscleGroup(token, muscleGroup, dayId) {
    return axios.post('/api/days/set-name', { muscleGroup, dayId }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function addExercise(token, exercise) {
    return axios.post('/api/days/exercise/add', exercise, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function removeExercise(token, dayId, exerciseId) {
    return axios.post('/api/days/exercise/remove', { dayId, exerciseId }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}




function getAllItems(token) {
    return axios.get('/api/items/all', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function addItem(token, item) {
    return axios.post('/api/items/add', item, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function removeItem(token, id) {
    return axios.post('/api/items/remove', { id }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}