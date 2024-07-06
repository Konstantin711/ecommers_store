import {
	GET_ADMIN_PAGE_REQUEST,
	GET_ADMIN_PAGE_SUCCESS,
	GET_ADMIN_PAGE_FAIL,
} from '../constants/adminPageConstants'



export const adminPageReducer = (state = { data: {} }, action) => {
    switch (action.type) {
      case GET_ADMIN_PAGE_REQUEST:
        return {
          loading: true,
        };
  
      case GET_ADMIN_PAGE_SUCCESS:
        return {
          loading: false,
          data: action.payload,
        };
  
      case GET_ADMIN_PAGE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };