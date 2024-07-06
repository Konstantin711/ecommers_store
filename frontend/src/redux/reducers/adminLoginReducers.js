import {
    LOGIN_PAGE_REQUEST,
    LOGIN_PAGE_SUCCESS,
    LOGIN_PAGE_FAILED,
  } from "../constants/adminLoginConstants";



export const loginPageReducer = (state = { loginData: [] }, action) => {
    switch (action.type) {

      case LOGIN_PAGE_REQUEST:
        return { ...state, loginData: action.payload };
  
      case LOGIN_PAGE_SUCCESS:
        return { loading: false, ...state, loginData: action.payload };
  
      case LOGIN_PAGE_FAILED:
        return { loading: false, error: action.payload };

      default:
        return state;
        
    }
  };