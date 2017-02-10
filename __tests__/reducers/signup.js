import { VERIFY_CODE_START, VERIFY_CODE_COMPLETE } from '../../app/actions/signup';
import signup from '../../app/reducers/signup';

describe('signup reducers', () => {
  it('should return the initial state', () => {
    expect(
      signup(undefined, {})
    ).toEqual({
      phoneVerifying: false,
      phoneVerified: false
    });
  });

  it('should return the verify code start state', () => {
    expect(
      signup(undefined, { type: VERIFY_CODE_START })
    ).toEqual({
      phoneVerifying: true,
      phoneVerified: false
    });
  });

  it('should return the verify code complete state', () => {
    expect(
      signup(undefined, {
        type: VERIFY_CODE_COMPLETE,
        phoneVerified: true
      })
    ).toEqual({
      phoneVerifying: false,
      phoneVerified: true
    });
  });
});
