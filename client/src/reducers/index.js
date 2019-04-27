import { combineReducers } from 'redux';
import quoteReducer from './quoteReducer';
import videoReducer from './videoReducer';
import navReducer from './navReducer';

export default combineReducers({
  quote: quoteReducer,
  video: videoReducer,
  nav: navReducer
})
