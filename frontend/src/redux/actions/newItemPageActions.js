import {
  GET_NEW_ITEM_PAGE_REQUEST,
  GET_NEW_ITEM_PAGE_SUCCESS,
  GET_NEW_ITEM_PAGE_FAIL,
} from "../constants/newItemPageConstants";

import axios from '../../axios';

export const getItemPageData = () => async (dispatch) => {
  try {
    dispatch({ type: GET_NEW_ITEM_PAGE_REQUEST });

    const { data } = await axios.get(
      "/api/add/new-item/"
    );
    // console.log(data)

    dispatch({ type: GET_NEW_ITEM_PAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_NEW_ITEM_PAGE_FAIL, payload: error });
  }
};
