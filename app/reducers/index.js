import { combineReducers } from 'redux';
import tutors from './tutors';

const rootReducer = combineReducers({
  tutors: tutors
});

export default rootReducer;
