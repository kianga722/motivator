import axios from 'axios';
import { GET_QUOTE } from './types';

export const getQuote = () => dispatch => {
  axios.get('/api/quote').then(res =>
    dispatch({
      type: GET_QUOTE,
      payload: res.data
    })
  )
}