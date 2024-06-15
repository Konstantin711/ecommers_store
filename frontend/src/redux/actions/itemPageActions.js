import {
  GET_ITEM_PAGE_REQUEST,
  GET_ITEM_PAGE_SUCCESS,
  GET_ITEM_PAGE_FAIL,
  SEND_TO_CART_SUCCESS,
  SEND_TO_CART_FAIL
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

export const sendToCart = (data) => async (dispatch, getState) => {

    try {
      dispatch({
        type: SEND_TO_CART_SUCCESS,
        payload: {
          slug: data.slug,
          size: data.item_sizes,
          color: data.item_colors,
        },
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().sendToCart.cartItems)
      );

      dispatch({ type: 'QTY_ADD_ITEM', payload: 1 })
      
    } catch (error) {
      console.log(error)
      dispatch({ type: SEND_TO_CART_FAIL, payload: error });
    }
  };
