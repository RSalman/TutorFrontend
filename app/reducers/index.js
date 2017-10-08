import { combineReducers } from 'redux';
import tutors from './tutors';
import signup from './signup';
import profile from './profile';
import login from './login';
import profileupdate from './profileupdate';

const rootReducer = combineReducers({
  tutors: tutors,
  profile: profile,
  signup: signup,
  login: login,
  profileupdate: profileupdate
});

export default rootReducer;
