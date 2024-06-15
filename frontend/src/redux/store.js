import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import { newItemPageReducer } from './reducers/newItemPageReducer'
import { catalogPageReducer } from './reducers/catalogPageReducers'
import { itemPageReducer } from './reducers/itemPageReducers'
import { sendToCartReducer } from './reducers/itemPageReducers'



const reducer = combineReducers({
    itemPage: newItemPageReducer,
    catalogPage: catalogPageReducer,
    itemPage: itemPageReducer,
    sendToCart: sendToCartReducer,
})


const initialState = {

}


const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store