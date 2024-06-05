import {
    GET_CATALOG_PAGE_REQUEST,
    GET_CATALOG_PAGE_SUCCESS,
    GET_CATALOG_PAGE_FAIL,
  } from "../constants/catalogPageConstants";
  


  export const catalogPageReducer = (state = { data: {} }, action) => {
    switch (action.type) {
      case GET_CATALOG_PAGE_REQUEST:
        return {
          loading: true,
        };
  
      case GET_CATALOG_PAGE_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
  
      case GET_CATALOG_PAGE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  