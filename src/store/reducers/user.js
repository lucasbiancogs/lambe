import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    USER_LOADED,
    LOADING_USER } from '../actions/actionTypes'

const initialState = {
    name: null,
    email: null,
    isLoading: false,
    token: null
}

/*
No caso se já existir um estado ele copia esse estado para dentro do reducer,
se não houver, pega o estado inicial...
depois de trazer o estado como spread, são alteradas os valores do estado
A action terá duas caracteristicas: o type e o payload
no caso deste payload é esperado o user, e com o user o email e o name
*/

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token
            }
        case USER_LOGGED_OUT:
            return {
                ...initialState
            }
        case LOADING_USER:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default reducer