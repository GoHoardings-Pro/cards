import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { messageReducer } from './reducer/messageReducer'

const reducder = combineReducers({
    message:messageReducer
})

const middleWare = [thunk];

const store = createStore(
    reducder,
    composeWithDevTools(applyMiddleware(...middleWare))
)
export default store