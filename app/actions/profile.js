// action types
export const GET_PROFILE_START = 'GET_PROFILE_START';
export const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE';

// action creators
export function getProfileStart() {
  return { type: GET_PROFILE_START };
}

export function getProfileComplete() {
  return { type: GET_PROFILE_COMPLETE };
}

export function retriveProfile() {
  return dispatch => {
    dispatch(getProfileStart());
    dispatch(getProfileComplete());
  };
}
