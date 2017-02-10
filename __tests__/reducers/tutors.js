import tutors from '../../app/reducers/tutors';

describe('tutors reducers', () => {
  it('should return the initial state', () => {
    expect(
      tutors(undefined, {})
    ).toEqual({
      allTutors: [],
      isLoading: false
    });
  });
});
