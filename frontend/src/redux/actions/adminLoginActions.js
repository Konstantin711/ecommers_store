import {
    LOGIN_PAGE_REQUEST,
    LOGIN_PAGE_SUCCESS,
    LOGIN_PAGE_FAILED,
  } from "../constants/adminLoginConstants";


import axios from '../../axios';


export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_PAGE_REQUEST });
  
      const config = {
        "Content-type": "application/json",
      };
  
      const { data } = await axios.post(
        "/api/token/",
        { email: email, password: password },
        config
      );
  
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.location.href = "/admin";
  
      dispatch({
        type: LOGIN_PAGE_SUCCESS,
        payload: data,
      });
  
      // apply new data to header
    //   dispatch({
    //     type: UPDATE_USER_SUCCESS,
    //     payload: data,
    //   });

    } catch (error) {
      dispatch({
        type: LOGIN_PAGE_FAILED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };