import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import { newItemPageReducer } from './reducers/newItemPageReducer'
import { catalogPageReducer } from './reducers/catalogPageReducers'
import { itemPageReducer } from './reducers/itemPageReducers'
import { sendToCartReducer } from './reducers/itemPageReducers'
import { orderConfirmationReducer, cartPageReducer } from './reducers/cartPageReducer'
import { adminPageReducer } from './reducers/adminPageReducers'
import { homePageReducer } from './reducers/homePageReducers'



const reducer = combineReducers({
    newItemPage: newItemPageReducer,
    catalogPage: catalogPageReducer,
    itemPage: itemPageReducer,
    sendToCart: sendToCartReducer,
    cartPage: cartPageReducer,
    confirmationReducer: orderConfirmationReducer,
    adminReducer: adminPageReducer,
    homeReducer: homePageReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []
    

const initialState = {
    sendToCart: { cartItems: cartItemsFromStorage },
}


const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store