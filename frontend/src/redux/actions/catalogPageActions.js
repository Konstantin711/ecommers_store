import {
    GET_CATALOG_PAGE_REQUEST,
    GET_CATALOG_PAGE_SUCCESS,
    GET_CATALOG_PAGE_FAIL,
  } from "../constants/catalogPageConstants";
  
  import axios from "axios";
  
  export const getCatalogPageData = (slug) => async (dispatch) => {
    try {
      dispatch({ type: GET_CATALOG_PAGE_REQUEST });
  
      const { data } = await axios.get(
        "/api/catalog/" + slug + "/all"
      );
  
      dispatch({ type: GET_CATALOG_PAGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_CATALOG_PAGE_FAIL, payload: error });
    }
  };
  