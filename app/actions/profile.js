// action types
export const GET_PROFILE_START = 'GET_PROFILE_START';
export const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE';
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';

export const POST_REQUEST_START = 'POST_REQUEST_START';
export const POST_REQUEST_COMPLETE = 'POST_REQUEST_COMPLETE';
export const POST_REQUEST_ERROR = 'POST_REQUEST_ERROR';

export const DELETE_REQUEST_COMPLETE = 'DELETE_REQUEST_COMPLETE';

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

export function tutorRequestCanceled() {
  return { type: DELETE_REQUEST_COMPLETE };
}

export function resetRequestCycle() {
  return { type: NEW_REQUEST };
}


export function fetchProfile(tutorID) {
  return dispatch => {
    dispatch(getProfileStart(tutorID));
    axios.get('/tutor_infos?tutor_id=' + tutorID + '&subject_id=' + 1 + '&student_id=' + 2 ).then(function(response) {
      if (response.status === 200)
        dispatch(getProfileComplete(response.data, tutorID));
    }).catch(function(error) {
      if (error.response)
        dispatch(getProfileError(error.response.data));
      else
        dispatch(getProfileError('Our servers seem to be down, please try again!'));
    });
  };
}

export function requestTutor(tutorID, studentID, subjectID) {
  return dispatch => {
    dispatch(tutorRequestStart(tutorID));
    axios.post('/tutor_requests', { tutor_id: tutorID, student_id: studentID, tutor_subject_id: subjectID })
            .then(function(response) {
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


export function cancelRequest(tutorID, studentID, subjectID) {
  return dispatch => {
    axios.post('/cancel_tutor_request', { tutor_id: tutorID, student_id: studentID, subject_id: subjectID })
            .then(function(response) {
              dispatch(tutorRequestCanceled());
            })
            .catch(function(error) {
              //What kind of error?
            });
  };
}
