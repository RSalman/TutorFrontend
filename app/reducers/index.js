import { combineReducers } from 'redux';
import tutors from './tutors';
import signup from './signup';
import profile from './profile';
import rating from './rating';
import login from './login';
import profileupdate from './profileupdate';
import session from './session';

const rootReducer = combineReducers({
  tutors: tutors,
  profile: profile,
  signup: signup,
  login: login,
  profileupdate: profileupdate,
  rating: rating,
  session: session
});

export default rootReducer;
