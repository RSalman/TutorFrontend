import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BecomeATutorComponent from '../../app/components/BecomeATutorComponent';
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

describe('<BecomeATutorComponent />', () => {
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
      <BecomeATutorComponent {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
