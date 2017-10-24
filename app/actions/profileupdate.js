export const GET_PROFILE_COMPLETE = 'GET_PROFILE_COMPLETE';
export const UPDATING_PROFILE_SUCCESS = 'UPDATING_PROFILE_SUCCESS';
export const UPDATING_PROFILE_ERROR = 'UPDATING_PROFILE_ERROR';
export const UPDATING_PROFILE = 'UPDATING_PROFILE';

export function getProfileComplete(response, userID) {
  return { type: GET_PROFILE_COMPLETE, profile: response, userID };
}

export function fetchProfile(tutorID) {
  return dispatch => {
    axios.get('/tutor_infos?tutor_id=' + tutorID).then(function(response) {
      if (response.status === 200)
        dispatch(getProfileComplete(response.data, tutorID));

    }).catch(function(error) {
        //TODO(SALMAN) PASS THE ERROR MESSAGE
    });
  };
}

export function updateProfile(profileData, user_id) {
  return dispatch => {
    dispatch({ type: 'UPDATING_PROFILE' });
    axios.patch('/users/' + user_id, profileData)
      .then(function(response) {
        if (response.status === 200)
          dispatch({ type: 'UPDATING_PROFILE_SUCCESS', userData: profileData });
      }).catch(function(error) {
        dispatch({ type: 'UPDATING_PROFILE_ERROR' });  //TODO(SALMAN PASS THE ERROR MESSAGE)
      });
  };
}
