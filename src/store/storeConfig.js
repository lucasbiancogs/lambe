import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from  'redux-thunk'
import userReducer from './reducers/user'
import postsReducer from './reducers/posts'
import messageReducer from './reducers/message'

/*
O que foi feito agora foi passar para um estado global os estados criados nos reducers
agora aqueles estados podem ser acessados através desse estado global
*/

const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer,
    message: messageReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig