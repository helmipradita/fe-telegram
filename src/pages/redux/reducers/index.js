import { combineReducers } from 'redux';
import usersReducers from './users';

const rootReducers = combineReducers({
  user: usersReducers,
});

export default rootReducers;
