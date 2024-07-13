import {
    GET_HOME_PAGE_REQUEST,
    GET_HOME_PAGE_SUCCESS,
    GET_HOME_PAGE_FAIL,

  } from "../constants/homePageConstants";
  


  export const homePageReducer = (state = { data: {} }, action) => {
    switch (action.type) {
      case GET_HOME_PAGE_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case GET_HOME_PAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
  
      case GET_HOME_PAGE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  




  
  