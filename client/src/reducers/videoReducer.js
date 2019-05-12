import { GET_VIDEO } from '../actions/types';

const initialState = {
  videoCurrent: {
    url: 'ZXsQAXx_ao0',
    title: `Shia LaBeouf "Just Do It" Motivational Speech`,
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VIDEO:
      return {
        ...state,
        videoCurrent: {
          url: action.payload.url,
          title: action.payload.title
        }
      }
    default:
      return state;
  }
}