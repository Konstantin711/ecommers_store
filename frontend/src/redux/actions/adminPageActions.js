import {
	GET_ADMIN_PAGE_REQUEST,
	GET_ADMIN_PAGE_SUCCESS,
	GET_ADMIN_PAGE_FAIL,
} from '../constants/adminPageConstants'


import customAxios from "../../axios";


export const getAdminPageData = () => async (dispatch) => {
	try{
		dispatch({ type: GET_ADMIN_PAGE_REQUEST })

        const {response} = await customAxios.get("/api/admin/");
        const data = response;
		

		dispatch({ type: GET_ADMIN_PAGE_SUCCESS, payload: data })

	}catch(error){
		console.log(error)
		dispatch({ type: GET_ADMIN_PAGE_FAIL, payload: error })
    }
};