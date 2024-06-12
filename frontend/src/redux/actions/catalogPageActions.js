import {
    GET_CATALOG_PAGE_REQUEST,
    GET_CATALOG_PAGE_SUCCESS,
    GET_CATALOG_PAGE_FAIL,

    GET_DETAILED_CATALOG_REQUEST,
    GET_DETAILED_CATALOG_SUCCESS,
    GET_DETAILED_CATALOG_FAIL
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

  export const getDetailedCatalogPageData = (data, slug, type) => async (dispatch) => {
    try {
      dispatch({ type: GET_DETAILED_CATALOG_REQUEST });
      
      data = {catalog_data: data, slug: slug, type: type}

      const response = await axios.post(
        "/api/get/detailed/detailed/",
        data, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data)
      data = response.data;

      dispatch({ type: GET_DETAILED_CATALOG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_DETAILED_CATALOG_FAIL, payload: error });
    }
  };
  