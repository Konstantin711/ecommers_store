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
      const item = action.payload;
      
      const existItemIndex = state.cartItems.findIndex(
        cartItem => 
          cartItem.slug === item.slug && 
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      let newCartItems;

      if (existItemIndex >= 0) {
        newCartItems = [...state.cartItems];
        newCartItems[existItemIndex] = item;

        return {
          loading: false,
          ...state,
          cartItems: newCartItems,
          error: "Товар вже доданий до кошика",
        };

      } else {
        newCartItems = [...state.cartItems, item];
      }

      return { 
        ...state,
        cartItems: newCartItems
      };
  
      case SEND_TO_CART_FAIL:
        return { loading: false, error: action.payload }
  
      default:
        return state
    }
  }