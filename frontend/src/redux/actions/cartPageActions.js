import {
	UPDATE_CART_REQUEST,
	UPDATE_CART_FAIL,
	DELETE_FROM_CART
} from '../constants/CartPageConstants'



export const getCartPageData = (dataFromLocalStorage) => async (dispatch) => {
	try{
		dispatch({ type: UPDATE_CART_REQUEST, payload:  dataFromLocalStorage})

	}catch(error){
		console.log(error)
		dispatch({ type: UPDATE_CART_FAIL, payload: error })
	}
}

export const deleteItemFromCart = (id) => async (dispatch, getState) => {
	try{
		dispatch({ type: DELETE_FROM_CART, payload: id})

		localStorage.setItem(
			"cartItems",
			JSON.stringify(getState().cartPage.cartPageItems)
		  );

		dispatch({ type: 'QTY_REMOVE_ITEM', payload: 1 })


	}catch(error){
		console.log(error)
		dispatch({ type: UPDATE_CART_FAIL, payload: error })
    }
}