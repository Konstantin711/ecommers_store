import {
    GET_HEADER_DATA_REQUEST,
    GET_HEADER_DATA_SUCCESS,
    GET_HEADER_DATA_FAILED,
  } from "../constants/topHeaderConstants";

  import axios from 'axios'

  
export const getData = () => async (dispatch) => {
    try {
        dispatch({ type: GET_HEADER_DATA_REQUEST })

        // const { data } = await axios.get(
        //   `http://localhost:8000/api/upper-header/data/`
        // );

        const data = JSON.parse(localStorage.getItem("userInfo"));

        console.log(data, 'data from local storage')
        dispatch({ type: GET_HEADER_DATA_SUCCESS, payload: data })

      } catch (error) {
        dispatch({ type: GET_HEADER_DATA_FAILED })
      }
}