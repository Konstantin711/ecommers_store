import {
  GET_NEW_ITEM_PAGE_REQUEST,
  GET_NEW_ITEM_PAGE_SUCCESS,
  GET_NEW_ITEM_PAGE_FAIL,
} from "../constants/newItemPageConstants";

export const newItemPageReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case GET_NEW_ITEM_PAGE_REQUEST:
      return {
        loading: true,
      };

    case GET_NEW_ITEM_PAGE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };

    case GET_NEW_ITEM_PAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
