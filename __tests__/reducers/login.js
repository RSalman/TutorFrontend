import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, UPDATE_EMAIL, UPDATE_PASSWORD } from '../../app/actions/login';
import login from '../../app/reducers/login';

var initialState = {
  email: '',
  password: '',
  successful_authentication: false,
  error: '',
  isLoading: false,
  user_data: null
};

describe('login reducers', () => {
  it('should return the initial state', () => {
    expect(
      login(undefined, {})
    ).toEqual(initialState);
  });

  it('should start login process', () => {
    expect(
      login(undefined, { type: LOGIN_START })
    ).toEqual({
      ...initialState,
      error: '',
      isLoading: true
    });
  });

  it('should update user data upon successful authentication', () => {
    const user_data = { id: 1 };
    expect(
      login(undefined, {
        type: LOGIN_SUCCESS,
        user_data,
      })
    ).toEqual({
      ...initialState,
      successful_authentication: true,
      user_data,
    });
  });

  it('should handle authentication error correctly', () => {
    const error = 'error';
    expect(
      login(undefined, {
        type: LOGIN_ERROR,
        error,
      })
    ).toEqual({
      ...initialState,
      error,
      isLoading: false,
    });
  });

  it('should update user email', () => {
    const email = 'email';
    expect(
      login(undefined, {
        type: UPDATE_EMAIL,
        email,
      })
    ).toEqual({
      ...initialState,
      email,
    });
  });

  it('should update user password', () => {
    const password = 'password';
    expect(
      login(undefined, {
        type: UPDATE_PASSWORD,
        password,
      })
    ).toEqual({
      ...initialState,
      password,
    });
  });
});
