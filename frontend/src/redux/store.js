import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import { newItemPageReducer } from './reducers/newItemPageReducer'
import { catalogPageReducer } from './reducers/catalogPageReducers'



const reducer = combineReducers({
    itemPage: newItemPageReducer,
    catalogPage: catalogPageReducer,
})


const initialState = {

}


const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store