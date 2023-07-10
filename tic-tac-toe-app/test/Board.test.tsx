/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Squares } from '../src/Squares';
import { Board } from '../src/Board';

describe('Board', () => {
  describe('during playing', () => {
    const setUp = () => {
      // prettier-ignore
      const squares = new Squares([
        'X', 'O', '',
        'X', '', '',
        '', '', '']);
      const mockOnPlay = jest.fn((_: Squares) => {});
      const { container } = render(<Board xIsNext={false} squares={squares} onPlay={mockOnPlay} />);

      const buttons = container.querySelectorAll('.square');

      return {
        squares: squares,
        buttons: buttons,
        mockOnPlay: mockOnPlay
      };
    };

    test('shows the same content as Squares object', () => {
      const { buttons } = setUp();

      expect(buttons[0]).toHaveTextContent('X');
      expect(buttons[1]).toHaveTextContent('O');
      expect(buttons[2]).toHaveTextContent('');
    });

    test('changes Squeares object when a buttons that has not clicked yet is clicked', async () => {
      const { squares, buttons, mockOnPlay } = setUp();

      await userEvent.click(buttons[4]);
      expect((mockOnPlay.mock.calls[0][0] as Squares).value).toEqual(squares.copyWith(4, 'O').value);
    });

    test('does not do nothing when a button has been already clicked', async () => {
      const { buttons, mockOnPlay } = setUp();

      await userEvent.click(buttons[0]);
      expect(mockOnPlay.mock.calls[1]).toEqual(undefined);
    });
  });

  describe('after finishing', () => {
    // prettier-ignore
    const squares = new Squares([
      'X', 'O', '',
      'X', 'O', '',
      'X', '', '']);
    const mockOnPlay = jest.fn((_: Squares) => {});
    const { container } = render(<Board xIsNext={false} squares={squares} onPlay={mockOnPlay} />);

    const buttons = container.querySelectorAll('.square');

    test('does not do nothing even thoug button is clicked', async () => {
      await userEvent.click(buttons[2]);
      expect(mockOnPlay).toBeCalledTimes(0);
    });
  });
});
