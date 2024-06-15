import {
    GET_ITEM_PAGE_REQUEST,
    GET_ITEM_PAGE_SUCCESS,
    GET_ITEM_PAGE_FAIL,
    SEND_TO_CART_SUCCESS,
    SEND_TO_CART_FAIL
  } from "../constants/itemPageConstants";


  export const itemPageReducer = (state = { data: {} }, action) => {
    switch (action.type) {
      case GET_ITEM_PAGE_REQUEST:
        return {
          loading: true,
        };
  
      case GET_ITEM_PAGE_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
  
      case GET_ITEM_PAGE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export const sendToCartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
  
      case SEND_TO_CART_SUCCESS:
        const item = action.payload
  
        // подумати про перевірку наявності товару
        // const existItem = state.CartItems.find(item)
  
        return { 
          ...state,
          cartItems: [...state.cartItems, item]
        }
  
      case SEND_TO_CART_FAIL:
        return { loading: false, CartItems: action.payload }
  
      default:
        return state
    }
  }