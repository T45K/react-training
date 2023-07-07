import { getUser } from '../src/getUser';

describe('getUser', () => {
  test('Returns X when true is given', () => {
    expect(getUser(true)).toEqual('X');
  });

  test('Returns O when fales is given', () => {
    expect(getUser(false)).toEqual('O');
  });
});
