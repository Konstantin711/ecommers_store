import {
  UPDATE_CART_REQUEST,
	UPDATE_CART_FAIL,
	DELETE_FROM_CART,

	CITY_LIST_REQUEST,
  CITY_LIST_SUCCESS,
  CITY_LIST_FAIL,

  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_FAIL
} from "../constants/cartPageConstants";


export const cartPageReducer = (state = { cartPageItems: [] }, action) => {
  switch (action.type) {
    case UPDATE_CART_REQUEST:
      return {
        loading: true,
        ...state,
        cartPageItems: action.payload
      };

    case UPDATE_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DELETE_FROM_CART:

      return {
        ...state,
        cartPageItems: state.cartPageItems.filter((_, index) => index !== action.payload),
      };

    default:
      return state;
  }
};


export const orderConfirmationReducer = (
  state = { novaPostData: { cities: [], departments: [] } },
  action
) => {
  const { novaPostData } = state;

  switch (action.type) {
    case CITY_LIST_REQUEST || DEPARTMENT_LIST_REQUEST:
      return { ...state, loading: true };

    case CITY_LIST_SUCCESS:
      // Отримайте поточний стан та novaPostData
      return {
        ...state,
        loading: false,
        novaPostData: { ...novaPostData, cities: action.payload },
      };

    case DEPARTMENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        novaPostData: {
          ...novaPostData,
          departments: action.payload,
        },
      };

    case DEPARTMENT_LIST_SUCCESS:
      return {};

    case DEPARTMENT_LIST_FAIL || CITY_LIST_FAIL:
      return {};

    default:
      return state;
  }
};
