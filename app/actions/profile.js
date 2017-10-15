// action types
export const GET_PROFILE_START = 'GET_PROFILE_START';
export const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE';
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';
export const GET_COURSES_REQUEST_STATUS = 'GET_COURSES_REQUEST_STATUS';
export const GET_DEMO_PROFILE_COMPLETE = 'GET_DEMO_PROFILE_COMPLETE';

export const POST_REQUEST_START = 'POST_REQUEST_START';
export const POST_REQUEST_COMPLETE = 'POST_REQUEST_COMPLETE';
export const POST_REQUEST_ERROR = 'POST_REQUEST_ERROR';

export const DELETE_REQUEST_COMPLETE = 'DELETE_REQUEST_COMPLETE';

export const NEW_REQUEST = 'NEW_REQUEST';

export const GET_PENDING_REQUESTS_COMPLETE = 'GET_PENDING_REQUESTS_COMPLETE';
export const GET_ACCEPTED_REQUESTS_COMPLETE = 'GET_ACCEPTED_REQUESTS_COMPLETE';

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

export function getPendingRequestsComplete(pendingRequests) {
  return { type: GET_PENDING_REQUESTS_COMPLETE, pendingRequests };
}

export function getAcceptedRequestsComplete(acceptedRequests) {
  return { type: GET_ACCEPTED_REQUESTS_COMPLETE, acceptedRequests };
}

export function fetchProfile(tutorID, studentID, demoProfile = false) {
  return dispatch => {
    dispatch(getProfileStart(tutorID));
    if(demoProfile){ //When Tutor is view own Profile
        axios.get('/tutor_infos?tutor_id=' + tutorID).then(function(response) {
        if (response.status === 200)
          dispatch({ type: GET_DEMO_PROFILE_COMPLETE, profile: response.data});
      }).catch(function(error) {
        if (error.response)
          dispatch(getProfileError(error.response.data));
        else
          dispatch(getProfileError('Our servers seem to be down, please try again!'));
      });
    }
    else{
     axios.all([axios.get('/tutor_infos?tutor_id=' + tutorID), axios.get('/all_subjects_request_status?tutor_id=' + tutorID + '&student_id=' + studentID)])
       .then(axios.spread((firstResponse, secondResponse) => {
          if (firstResponse.status === 200)
            dispatch(getProfileComplete(firstResponse.data, tutorID));
          if (secondResponse.status === 200)
            dispatch({ type: GET_COURSES_REQUEST_STATUS, course_status: secondResponse.data });
       })).catch(error => {
         if (error.response)
          dispatch(getProfileError(error.response.data));
        else
          dispatch(getProfileError('Our servers seem to be down, please try again!'));
       });
    }           
  };
}

export function requestTutor(tutorID, studentID, subjectID) {
  return dispatch => {
    dispatch(tutorRequestStart(tutorID));
    axios.post('/tutor_requests', { tutor_id: tutorID, student_id: studentID, tutor_subject_id: subjectID })
      .then(function(response) {
        dispatch(tutorRequestComplete(tutorID));
         axios.get('/all_subjects_request_status?tutor_id=' + tutorID + '&student_id=' + studentID)
          .then(function(response) {
            if (response.status === 200)
              dispatch({ type: GET_COURSES_REQUEST_STATUS, course_status: response.data });
          })
          .catch(function(error) {});
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
    axios.post('/cancel_tutor_request', { tutor_id: tutorID, student_id: studentID, tutor_subject_id: subjectID })
      .then(function(response) {
        dispatch(tutorRequestCanceled());
         axios.get('/all_subjects_request_status?tutor_id=' + tutorID + '&student_id=' + studentID)
          .then(function(response) {
            if (response.status === 200)
              dispatch({ type: GET_COURSES_REQUEST_STATUS, course_status: response.data });
          })
          .catch(function(error){});
      })
      .catch(function(error) {
        //What kind of error?
      });
  };
}

export function cancelTutorRequest(requestID) {
  return dispatch => {
    axios.post('/cancel_tutor_request', { request_id: requestID })
      .then(function(response) {
        dispatch(updatePendingRequests(getState().session.userData.id));
      })
      .catch(function(error) {
        //What kind of error?
      });
  };
}

export function updatePendingRequests(id) {
  return (dispatch, getState) => {
    var params;
    var url;
    var tutorMode = getState().session.tutorMode;
    if (tutorMode) {
      params = { tutor_id: id };
      url = '/pending_tutor_requests';
    } else {
      params = { student_id: id };
      url = '/pending_student_requests';
    }
    axios.get(url, { params, })
      .then(function(response) {
        dispatch(getPendingRequestsComplete(response.data));
      }).catch(function(error) {
        // TODO: catch errors here
      });
  };
}

export function acceptPendingRequest(pending_request_id, user_id) {
  return dispatch => {
    axios.put('/tutor_requests/' + pending_request_id)
      .then(function(response) {
        dispatch(updatePendingRequests(user_id));
        dispatch(updateAcceptedRequests(user_id));
      }).catch(function(error) {
        // TODO: catch errors here
      });
  };
}

export function updateAcceptedRequests(id) {
  return (dispatch, getState) => {
    var params;
    var url;
    var tutorMode = getState().session.tutorMode;
    if (tutorMode) {
      params = { tutor_id: id };
      url = '/accepted_tutor_requests';
    } else {
      params = { student_id: id };
      url = '/accepted_student_requests';
    }
    axios.get(url, { params, })
      .then(function(response) {
        dispatch(getAcceptedRequestsComplete(response.data));
      }).catch(function(error) {
        // TODO: catch errors here
      });
  };
}
