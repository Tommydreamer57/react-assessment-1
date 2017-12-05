import axios from 'axios';

const initialState = {
    tasks: [],
    details: {}
}

const _FULFILLED = '_FULFILLED'
const GET_TASKS = 'GET_TASKS'
const UPDATE_TASK = 'UPDATE_TASK'
const GET_DETAILS = 'GET_DETAILS'
const HANDLE_CHANGE = 'HANDLE_CHANGE'

export function getTasks() {
    let tasks = axios.get(`https://practiceapi.devmountain.com/api/tasks`).then(response => response.data)
    return {
        type: GET_TASKS,
        payload: tasks
    }
}

export function getDetails(id) {
    let details = axios.get(`https://practiceapi.devmountain.com/api/tasks`).then(response => response.data.filter(task => task.id == id)[0])
    return {
        type: GET_DETAILS,
        payload: details
    }
}

export function handleChange(target, value) {
    return {
        type: HANDLE_CHANGE,
        payload: {
            target,
            value
        }
    }
}

export function submit(task) {
    let tasks = axios.patch(`https://practiceapi.devmountain.com/api/tasks/${task.id}`, task).then(response => response.data)
    return {
        type: GET_TASKS,
        payload: tasks
    }
}

export function complete(task) {
    let tasks = axios.put(`https://practiceapi.devmountain.com/api/tasks/${task.id}`).then(response => response.data)
    return {
        type: GET_TASKS,
        payload: tasks
    }
}

export function deleteTask(task) {
    let tasks = axios.delete(`https://practiceapi.devmountain.com/api/tasks/${task.id}`).then(response => response.data)
    return {
        type: GET_TASKS,
        payload: tasks
    }
}

export default function reducer(state = initialState, action) {
    console.log(action)
    // console.log(GET_TASKS + _FULFILLED)
    if (!localStorage.getItem('state')) {
        localStorage.setItem('state', state)
    }
    switch(action.type) {
        case GET_TASKS + _FULFILLED:
            return Object.assign({}, state, { tasks: action.payload })
        case GET_DETAILS + _FULFILLED:
            return Object.assign({}, state, { details: action.payload })
        case HANDLE_CHANGE:
            let details = Object.assign({}, state.details, {[action.payload.target]: action.payload.value})
            return Object.assign({}, state, { details })
        case UPDATE_TASK + _FULFILLED:
            return Object.assign({}, state, { tasks: action.payload })
        default:
            return state
    }
}
