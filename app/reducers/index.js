import { combineReducers } from 'redux';
import tutors from './tutors';
import signup from './signup';
import profile from './profile';

const rootReducer = combineReducers({
  tutors: tutors,
  profile: profile,
  signup: signup
});

export default rootReducer;
