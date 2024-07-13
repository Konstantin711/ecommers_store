import {
    GET_HOME_PAGE_REQUEST,
    GET_HOME_PAGE_SUCCESS,
    GET_HOME_PAGE_FAIL,

  } from "../constants/homePageConstants";
  
  import axios from "axios";
  
  export const getHomePageData = () => async (dispatch) => {
    try {
      dispatch({ type: GET_HOME_PAGE_REQUEST });
      
      const response = await axios.get("/api/main_page_data/");
  
      dispatch({ type: GET_HOME_PAGE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_HOME_PAGE_FAIL, payload: error });
    }
  };
