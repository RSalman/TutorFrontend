// action types
export const GET_PROFILE_START = 'GET_PROFILE_START';
export const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE';
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';

export const POST_REQUEST_START = 'POST_REQUEST_START';
export const POST_REQUEST_COMPLETE = 'POST_REQUEST_COMPLETE';
export const POST_REQUEST_ERROR = 'POST_REQUEST_ERROR';

export const NEW_REQUEST = 'NEW_REQUEST';

// action creators
export function getProfileStart(userID) {
  return { type: GET_PROFILE_START, userID };
}

export function getProfileComplete(response, userID) {
  return { type: GET_PROFILE_COMPLETE, profile: response, userID };
}

export function getProfileError(error) {
  return { type: GET_PROFILE_ERROR, error };
}

export function tutorRequestError(error) {
  return { type: POST_REQUEST_ERROR, error };
}

export function tutorRequestStart(userID) {
  return { type: POST_REQUEST_START, userID };
}

export function tutorRequestComplete(tutorID) {
  return { type: POST_REQUEST_COMPLETE, tutorID };
}

export function resetRequestCycle() {
  return { type: NEW_REQUEST };
}


export function fetchProfile(userID) {
  return dispatch => {
    dispatch(getProfileStart(userID));
    axios.get('/get_tutor_profile').then(function(response) {
      if (response.status === 200)
        dispatch(getProfileComplete(response.data, userID));
    }).catch(function(error) {
      if (error.response)
        dispatch(getProfileError(error.response.data));
      else
        dispatch(getProfileError('Our servers seem to be down, please try again!'));
    });
  };
}

export function requestTutor(tutorID) {
  return dispatch => {
    dispatch(tutorRequestStart(tutorID));
    axios.post('/request_tutor', { tutorID: tutorID })
            .then(function(response) {
                //TODO(Salman): Discuss responses for tutor request
              dispatch(tutorRequestComplete(tutorID));
            })
            .catch(function(error) {
              if (error.response)
                dispatch(tutorRequestError(error.response.data));
              else
                    dispatch(tutorRequestError('Our servers seem to be down, please try again!'));
            });
  };
}
