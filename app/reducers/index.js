import { combineReducers } from 'redux';
import tutors from './tutors';
import signup from './signup';
import profile from './profile';
import login from './login';

const rootReducer = combineReducers({
  tutors: tutors,
  profile: profile,
  signup: signup,
  login: login
});

export default rootReducer;
