import { Squares } from '../src/Squares';

describe('Squares', () => {
  const subject = new Squares();

  describe('isFilled', () => {
    test('returns false when the square has not changed yet', () => {
      expect(subject.isFilled(0)).toEqual(false);
    });

    test('returns true when the square has changed', () => {
      expect(subject.copyWith(0, 'X').isFilled(0)).toEqual(true);
    });
  });

  describe('linesUp', () => {
    test('returns false when not filled at all', () => {
      expect(subject.linesUp()).toEqual(false);
    });

    test('returns false when not aligned', () => {
      const tmp = new Squares(['O', 'X', 'O', 'X', 'O', 'X', 'X', 'O', 'X']);
      expect(tmp.linesUp()).toEqual(false);
    });

    test('returns true when aligned', () => {
      // prettier-ignore
      const tmp1 = new Squares([
        'O', 'O', 'O',
        'X', 'X', '',
        '', '', '']);
      expect(tmp1.linesUp()).toEqual(true);

      // prettier-ignore
      const tmp2 = new Squares([
        'O', 'X', 'O',
        'X', 'O', 'X',
        'O', '', '']);
      expect(tmp2.linesUp()).toEqual(true);
    });
  });

  test('copyWith returns new object', () => {
    expect(subject.copyWith(0, 'X').value).toEqual(['X', '', '', '', '', '', '', '', '']);
    expect(subject.copyWith(0, 'X').copyWith(8, 'O').value).toEqual(['X', '', '', '', '', '', '', '', 'O']);
  });

  test('copyWith does not mutate itself', () => {
    subject.copyWith(0, 'X').copyWith(1, 'X').copyWith(2, 'X');
    expect(subject.value).toEqual(['', '', '', '', '', '', '', '', '']);
  });
});
