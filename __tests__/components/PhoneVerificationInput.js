import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PhoneVerificationInput from '../../app/components/PhoneVerificationInput';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

function setup(verified, verifying) {
  const store = mockStore({
    signup: {
      phoneVerified: verified,
      phoneVerifying: verifying
    }
  });
  const props = {
    verifyCode: jest.fn(),
    store
  };
  return props;
}

describe('<PhoneVerificationInput />', () => {
  it('should disable input when verifying', () => {
    const props = setup(false, true);
    const tree = renderer.create(
      <PhoneVerificationInput {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should show no message when invalid code entered', () => {
    const props = setup(false, false);
    const tree = renderer.create(
      <PhoneVerificationInput {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
