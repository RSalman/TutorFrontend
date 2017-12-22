import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserSignupFormComponent from '../../app/components/UserSignupFormComponent';
import '../../app/index';
import '../../app/util/globalAxios';
import '../../app/util/I18n';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function setup(state) {
  const store = mockStore(state);
  const props = {
    setProgressBar: jest.fn(),
    store
  };
  return props;
}

describe('<UserSignupFormComponent />', () => {
  it('renders correctly', () => {
    const props = setup({
      signup: {
       phoneVerified: false,
        phoneVerifying: false,
        signup_data: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'jdoe@uottawa.ca',
          password: '',
          phone_number: ''
        }
      }
    });
    const tree = renderer.create(
      <UserSignupFormComponent {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
