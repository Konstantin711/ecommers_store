import {
	UPDATE_CART_REQUEST,
	UPDATE_CART_FAIL,
	DELETE_FROM_CART,

	CITY_LIST_REQUEST,
    CITY_LIST_SUCCESS,
    CITY_LIST_FAIL,

    DEPARTMENT_LIST_REQUEST,
    DEPARTMENT_LIST_SUCCESS,
    DEPARTMENT_LIST_FAIL,

	CREATE_NEW_ORDER_REQUEST,
	CREATE_NEW_ORDER_SUCCESS,
	CREATE_NEW_ORDER_FAIL,
} from '../constants/cartPageConstants'

import axios from 'axios'

const updatePricesInLocalData = (localData, updatedPrices) => {
	// Перевірка, що localData і updatedPrices є масивами
	if (!Array.isArray(localData) || !Array.isArray(updatedPrices)) {
		throw new Error('localData and updatedPrices must be arrays');
	}

	return localData.map(item => {
		const updatedItem = updatedPrices.find(priceObj => priceObj.slug === item.slug);
		if (updatedItem) {
			return { ...item, price: updatedItem.price };
		}
		return item;
	});
};


export const getCartPageData = (dataFromLocalStorage) => async (dispatch) => {
	// на цьому моменті ми сходимо за вточненням ціни
	const slugs = [];
	if (dataFromLocalStorage != null ) {
		for (let i = 0; i < dataFromLocalStorage.length; i++){
			if (slugs.includes(dataFromLocalStorage[i]['slug'])){
				continue
			}
			else{
				slugs.push(dataFromLocalStorage[i]['slug'])
			}
		}
	}
	
	try{
		const response = await axios.post(`api/get_current_price/`, slugs)
		
		const updatedPrices = response.data.data;
		const updatedLocalData = updatePricesInLocalData(dataFromLocalStorage, updatedPrices);
		console.log(updatedLocalData ,"FROM ACTIONS")
		dispatch({ type: UPDATE_CART_REQUEST, payload: updatedLocalData})

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

export const createNewOrder = (data) => async (dispatch) => {
	try {
		dispatch({ type: CREATE_NEW_ORDER_REQUEST })

		const response = await axios.post(
		  "api/create_order/",
		  data,
		  {
			headers: {
			  'Content-Type': 'multipart/form-data',
			},
		  }
		);
		
		localStorage.removeItem(
			"cartItems",
		  );

		dispatch({ type: CREATE_NEW_ORDER_SUCCESS, payload: response.data })

	  } catch (error) {
		dispatch({ type: CREATE_NEW_ORDER_FAIL, payload: error })
	  }
}


// NOVA POSTA BLOCK
export const getNovaPostCities = (city) => async (dispatch) => {
	try {
	  dispatch({ type: CITY_LIST_REQUEST })
  
	  const json_data = {
		apiKey: "e529864b93c9055c912e68cf5259655c",
		modelName: "Address",
		calledMethod: "searchSettlements",
		methodProperties: {
		  CityName: city,
		  // Limit: "30",
		  // Page: "1",
		},
	  };
  
  
	  const { data } = await axios.post(`https://api.novaposhta.ua/v2.0/json/`, json_data)
	  const cities = []
  
  
	  for (let i = 0; i < data.data[0]['Addresses'].length; i++) {
		cities.push({
		  region: data.data[0]["Addresses"][i]["Present"],
		  delivery_city: data.data[0]["Addresses"][i]["DeliveryCity"],
		});
	  }
	  dispatch({ type: CITY_LIST_SUCCESS, payload: cities })
  
	}catch(error){
	  dispatch({ type: CITY_LIST_FAIL, payload: error })
	}
  }
  
  export const getNovaPostDepartments = (ref) => async (dispatch) => {
	try {
	  dispatch({ type: DEPARTMENT_LIST_REQUEST })
  
	  const json_data = {
		apiKey: "e529864b93c9055c912e68cf5259655c",
		modelName: "Address",
		calledMethod: "getWarehouses",
		methodProperties: {
		  CityRef: ref,
		  // Page: "1",
		  // Limit: "10",
		  Language: "UA",
		},
	  };
  
	  const { data } = await axios.post(`https://api.novaposhta.ua/v2.0/json/`, json_data)
	  const departments = []
  
	  for (let i = 0; i < data.data.length; i++){
		departments.push({region: data.data[i]['Description'], ref: data.data[i]['Ref'] })
  
	  }
	  dispatch({ type: DEPARTMENT_LIST_SUCCESS, payload: departments })
  
	}catch(error){
	  dispatch({ type: DEPARTMENT_LIST_FAIL, payload: error })
	}
  }
// NOVA POSTA BLOCK