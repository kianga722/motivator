import axios from 'axios';
import { GET_VIDEO } from './types';

export const getVideo = () => dispatch => {
  axios.get('/api/video').then(res =>
    dispatch({
      type: GET_VIDEO,
      payload: res.data
    })
  )
}