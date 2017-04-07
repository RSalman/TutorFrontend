import { VERIFY_CODE_START, VERIFY_CODE_COMPLETE, SET_PROGRESS_BAR, UPDATE_FORM } from '../../app/actions/signup';
import signup from '../../app/reducers/signup';

var initialState = {
  phoneVerified: false,
  phoneVerifying: false,
  signup_data: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: ''
  },
  tutor_data: {
    image: '',
    courseList: '',
    rate: '',
    educationLevel: '',
    tutor_description: ''
  },
  progressStatus: 0,
  successfulSubmission: false,
  error: '',
  isLoading: false
};

describe('signup reducers', () => {
  it('should return the initial state', () => {
    expect(
      signup(undefined, {})
    ).toEqual(initialState);
  });

  it('should return the verify code start state', () => {
    expect(
      signup(undefined, { type: VERIFY_CODE_START })
    ).toEqual({
      ...initialState,
      phoneVerified: false,
      phoneVerifying: true
    });
  });

  it('should return the verify code complete state', () => {
    expect(
      signup(undefined, {
        type: VERIFY_CODE_COMPLETE,
        phoneVerified: true
      })
    ).toEqual({
      ...initialState,
      phoneVerified: true,
      phoneVerifying: false
    });
  });

  it('should update the progress bar', () => {
    expect(
      signup(undefined, { type: SET_PROGRESS_BAR, value: 0.5 })
    ).toEqual({
      ...initialState,
      progressStatus: 0.5
    });
  });

  it('should update form', () => {
    var formData = {
      first_name: 'Muraad',
      last_name: 'Hared',
      email: 'mhare095@uottawa.ca',
      password: 'prosprDev2017',
      phone_number: '6132165235'
    };
    expect(
      signup(undefined, { type: UPDATE_FORM, formData })
    ).toEqual({
      ...initialState,
      signup_data: formData
    });
  });
});
