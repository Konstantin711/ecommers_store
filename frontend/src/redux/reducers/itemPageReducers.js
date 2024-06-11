import {
    GET_ITEM_PAGE_REQUEST,
    GET_ITEM_PAGE_SUCCESS,
    GET_ITEM_PAGE_FAIL,
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
  