import {
  LOGIN_PAGE_REQUEST,
  LOGIN_PAGE_SUCCESS,
  LOGIN_PAGE_FAILED,

  LOGOUT_PAGE_REQUEST,
  LOGOUT_PAGE_SUCCESS,
  LOGOUT_PAGE_FAILED
} from "../constants/adminLoginConstants";

import {
  GET_HEADER_DATA_REQUEST,
} from "../constants/topHeaderConstants";


import customAxios from "../../axios";


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_PAGE_REQUEST });

    const config = {
      "Content-type": "application/json",
    };

    const { data } = await customAxios.post(
      "/api/token/",
      { email: email, password: password },
      config
    );

    localStorage.setItem("userInfo", JSON.stringify(data));

    if (window.location.href === "http://localhost:3000/login") {
      window.location.href = "/";
    } else {
      window.location.href = "/admin";
    }

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

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_PAGE_REQUEST });

    localStorage.removeItem("userInfo");

    dispatch({ type: LOGOUT_PAGE_SUCCESS });
    dispatch({ type: 'RESET_USER_INFO_ARRAY' });

    // apply new data to header
    // dispatch({
    //   type: UPDATE_USER_SUCCESS,
    //   payload: {},
    // });

  } catch (error) {
    dispatch({
      type: LOGOUT_PAGE_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
