import { GET_QUOTE } from '../actions/types';

const initialState = {
  quoteCurrent: {
    quote: null,
    author: null,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUOTE:
      return {
        ...state,
        quoteCurrent: {
          quote: action.payload.quote,
          author: action.payload.author
        }
      }
    default:
      return state;
  }
}