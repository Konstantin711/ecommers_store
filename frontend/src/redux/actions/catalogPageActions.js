import {
    GET_CATALOG_PAGE_REQUEST,
    GET_CATALOG_PAGE_SUCCESS,
    GET_CATALOG_PAGE_FAIL,
  } from "../constants/catalogPageConstants";
  
  import axios from "axios";
  
  export const getCatalogPageData = (slug, type) => async (dispatch) => {
    try {
      dispatch({ type: GET_CATALOG_PAGE_REQUEST });
      
      let data;

      if (type) {
        const response = await axios.get("/api/catalog/" + slug + "/" + type + "/all");
        data = response.data;
      } else {
        const response = await axios.get("/api/catalog/" + slug + "/all");
        data = response.data;
      }
  
      dispatch({ type: GET_CATALOG_PAGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_CATALOG_PAGE_FAIL, payload: error });
    }
  };
  