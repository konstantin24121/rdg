import { combineReducers } from 'redux';

import deals from './modules/deals';
import user from './modules/user';

const rootReducer = combineReducers({
  deals,
  user,
});

export default rootReducer;
