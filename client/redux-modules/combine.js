import { combineReducers } from 'redux';

import deals from './modules/deals';

const rootReducer = combineReducers({
  deals,
});

export default rootReducer;
