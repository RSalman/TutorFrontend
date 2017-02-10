import { combineReducers } from 'redux';
import tutors from './tutors';
import profile from './profile';

const rootReducer = combineReducers({
  tutors: tutors,
  profile: profile
});

export default rootReducer;
