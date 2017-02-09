import { combineReducers } from 'redux';
import tutors from './tutors';
import signup from './signup';

const rootReducer = combineReducers({
  tutors: tutors,
  signup: signup
});

export default rootReducer;
