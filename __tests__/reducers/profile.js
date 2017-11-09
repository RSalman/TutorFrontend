import { GET_PROFILE_START, GET_PROFILE_COMPLETE, GET_PROFILE_ERROR, POST_REQUEST_START, POST_REQUEST_COMPLETE, POST_REQUEST_ERROR, NEW_REQUEST, DELETE_REQUEST_COMPLETE, GET_ACCEPTED_REQUESTS_COMPLETE, GET_PENDING_REQUESTS_COMPLETE, GET_COURSES_REQUEST_STATUS, GET_DEMO_PROFILE_COMPLETE } from '../../app/actions/profile';
import { UPDATE_USER } from '../actions/login';
import profile from '../../app/reducers/profile';

var initialState = {
  profile: null,
  isLoading: false,
  requesting: false,
  requestSent: false,
  error: '',
  requestError: false,
  requestDeleted: false,
  pendingRequests: [],
  acceptedRequests: [],
  current_user: { id: null },
  access_token: null,
  courses_request_status: []
};

describe('profile reducers', () => {
  it('should return the initial state', () => {
    expect(
      profile(undefined, {})
    ).toEqual(initialState);
  });

  it('should start get profile process', () => {
    expect(
      profile(undefined, { type: GET_PROFILE_START })
    ).toEqual({
      ...initialState,
      profile: null,
      isLoading: true,
      error: '',
      courses_request_status: []
    });
  });

  it('should end get profile process', () => {
    const profile_obj = { name: 'test', 'requestPending': true };
    expect(
      profile(undefined, { type: GET_PROFILE_COMPLETE, profile: profile_obj })
    ).toEqual({
      ...initialState,
      profile: profile_obj,
      isLoading: false,
      error: '',
      requestSent: true,
    });
  });

  it('should handle get profile error', () => {
    const profile_obj = { name: 'test', 'requestPending': true };
    expect(
      profile(undefined, { type: GET_PROFILE_ERROR, profile: profile_obj, error: 'error' })
    ).toEqual({
      ...initialState,
      profile: profile_obj,
      isLoading: false,
      error: 'error',
    });
  });

  it('should start tutor request', () => {
    expect(
      profile(undefined, { type: POST_REQUEST_START })
    ).toEqual({
      ...initialState,
      requesting: true,
      requestSent: false,
    });
  });

  it('should end tutor request', () => {
    expect(
      profile(undefined, { type: POST_REQUEST_COMPLETE })
    ).toEqual({
      ...initialState,
      requesting: false,
      requestSent: true,
    });
  });

  it('should delete tutor request', () => {
    expect(
      profile(undefined, { type: DELETE_REQUEST_COMPLETE })
    ).toEqual({
      ...initialState,
      requestSent: false,
    });
  });


  it('should handle tutor request error', () => {
    expect(
      profile(undefined, { type: POST_REQUEST_ERROR, error: 'error' })
    ).toEqual({
      ...initialState,
      requestSent: false,
      requesting: false,
      requestError: 'error',
    });
  });

  it('should handle new request', () => {
    expect(
      profile(undefined, { type: NEW_REQUEST })
    ).toEqual({
      ...initialState,
      requestSent: false,
      requesting: false,
      requestError: '',
    });
  });

  it('should update pending requests', () => {
    expect(
      profile(undefined, { type: GET_PENDING_REQUESTS_COMPLETE, pendingRequests: ['test1'], })
    ).toEqual({
      ...initialState,
      pendingRequests: ['test1'],
    });
  });

  it('should update accepted requests', () => {
    expect(
      profile(undefined, { type: GET_ACCEPTED_REQUESTS_COMPLETE, acceptedRequests: ['test2'], })
    ).toEqual({
      ...initialState,
      acceptedRequests: ['test2'],
    });
  });

  it('should update course request status', () => {
    expect(
      profile(undefined, { type: GET_COURSES_REQUEST_STATUS, course_status: 'test3', })
    ).toEqual({
      ...initialState,
      courses_request_status: 'test3',
    });
  });
});
