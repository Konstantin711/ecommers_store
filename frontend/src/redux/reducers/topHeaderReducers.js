import {
  GET_HEADER_DATA_REQUEST,
  GET_HEADER_DATA_SUCCESS,
  GET_HEADER_DATA_FAILED,
} from "../constants/topHeaderConstants";

export const headerPageReducer = (state = { userInfo: [] }, action) => {
  switch (action.type) {

    case GET_HEADER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case 'RESET_USER_INFO_ARRAY':
        return {
          ...state,
          loading: true,
          userInfo: []
        };

    case GET_HEADER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload
      };

    case GET_HEADER_DATA_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
