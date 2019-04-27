import { SET_NAV_QUOTE, SET_NAV_VIDEO } from '../actions/types';

const initialState = {
  nav: {
    quote: false,
    video: false,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NAV_QUOTE:
      return {
        ...state,
        nav: {
          quote: true,
          video: false
        }
      }
      case SET_NAV_VIDEO:
      return {
        ...state,
        nav: {
          quote: false,
          video: true
        }
      }
    default:
      return state;
  }
}