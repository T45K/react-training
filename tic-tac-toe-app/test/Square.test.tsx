/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { Square } from '../src/Square';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const setUp = () => {
  let clicked = false;
  render(
    <Square
      value={'X'}
      onSquareClick={() => {
        clicked = true;
      }}
    />
  );
  const square = screen.getByRole('button');

  return {
    square: square,
    isClicked: (): boolean => clicked
  };
};

describe('Board', () => {
  test('shows initial value', () => {
    const { square, isClicked } = setUp();

    expect(square).toHaveTextContent('X');
    expect(isClicked()).toEqual(false);
  });

  test('has click event', async () => {
    const { square, isClicked } = setUp();

    await userEvent.click(square);
    expect(isClicked()).toEqual(true);
  });
});
