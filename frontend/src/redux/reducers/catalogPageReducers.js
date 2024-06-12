import {
    GET_CATALOG_PAGE_REQUEST,
    GET_CATALOG_PAGE_SUCCESS,
    GET_CATALOG_PAGE_FAIL,

    GET_DETAILED_CATALOG_REQUEST,
    GET_DETAILED_CATALOG_SUCCESS,
    GET_DETAILED_CATALOG_FAIL
  } from "../constants/catalogPageConstants";
  


  export const catalogPageReducer = (state = { data: {} }, action) => {
    switch (action.type) {
      case GET_CATALOG_PAGE_REQUEST:
      case GET_DETAILED_CATALOG_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case GET_CATALOG_PAGE_SUCCESS:
      case GET_DETAILED_CATALOG_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
  
      case GET_CATALOG_PAGE_FAIL:
      case GET_DETAILED_CATALOG_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  




  
  