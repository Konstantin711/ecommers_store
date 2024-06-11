import {
  GET_ITEM_PAGE_REQUEST,
  GET_ITEM_PAGE_SUCCESS,
  GET_ITEM_PAGE_FAIL,
} from "../constants/itemPageConstants";

import axios from "axios";

export const getItemPageData = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_ITEM_PAGE_REQUEST });

    const response = await axios.get("/api/catalog/" + slug);
    const data = response.data;

    dispatch({ type: GET_ITEM_PAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ITEM_PAGE_FAIL, payload: error });
  }
};
