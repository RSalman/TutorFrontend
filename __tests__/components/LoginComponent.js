import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginComponent from '../../app/components/LoginComponent';
import '../../app/index';
import '../../app/util/globalAxios';
import '../../app/util/I18n';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function setup(state) {
  const store = mockStore(state);
  const props = {
    authenticate: jest.fn(),
    store
  };
  return props;
}

describe('<LoginComponent />', () => {
  it('should display login screen', () => {
    const props = setup({
      login: {
        email: 'student@uottawa.ca',
        password: 'complexPassword',
        successful_authentication: false,
        error: '',
        isLoading: false,
        user_data: null
      }
    });
    const tree = renderer.create(
      <LoginComponent {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
