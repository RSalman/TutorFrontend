import { combineReducers } from 'redux';
import tutors from './tutors';
import signup from './signup';
import profile from './profile';
import rating from './rating';
import login from './login';
import profileupdate from './profileupdate';
import session from './session';

const appReducer = combineReducers({
  tutors: tutors,
  profile: profile,
  signup: signup,
  login: login,
  profileupdate: profileupdate,
  rating: rating,
  session: session
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGN_OUT') {
    state = undefined;
    /* TEMP DIRTY SOLUTION */
    for (var i =0;i<1000;i++) {
      window.clearInterval(i);
    }
  }

  return appReducer(state, action)
}

export default rootReducer;
