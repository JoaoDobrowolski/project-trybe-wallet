import { combineReducers } from 'redux';
import user from './user';
// import currency from './wallet';
// import currency from './currency';
import wallet from './wallet';

const rootReducer = combineReducers({
  user,
  wallet,
});

export default rootReducer;
