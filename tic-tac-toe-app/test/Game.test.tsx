/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Game } from '../src/Game';

const setUp = () => {
  const { container } = render(<Game />);
  const buttons: NodeListOf<Element> = container.querySelectorAll('.square');

  const getButtonTexts = (): (string | null)[] => [...Array(9)].map((_, i) => buttons[i].textContent);
  const getStatus = (): Element | null => container.querySelector('.game-info div');
  const getHistoryButtons = (): NodeListOf<Element> => container.querySelectorAll('li');

  return {
    buttons: buttons,
    getButtonTexts: getButtonTexts,
    getStatus: getStatus,
    getHistoryButtons: getHistoryButtons
  };
};

describe('Game', () => {
  test('shows empty board at first', () => {
    const { getButtonTexts, getStatus, getHistoryButtons } = setUp();

    expect(getButtonTexts()).toEqual(Array(9).fill(''));
    expect(getStatus()).toHaveTextContent('Next player: X');
    expect(getHistoryButtons().item(0)).toHaveTextContent('Go to game start');
  });

  test('shows current board and winner', async () => {
    const { buttons, getButtonTexts, getStatus, getHistoryButtons } = setUp();

    await userEvent.click(buttons[0]);
    expect(getButtonTexts()).toEqual(['X', '', '', '', '', '', '', '', '']);
    expect(getStatus()).toHaveTextContent('Next player: O');
    expect(getHistoryButtons()[1]).toHaveTextContent('Go to move #1');

    await userEvent.click(buttons[3]);
    expect(getButtonTexts()).toEqual(['X', '', '', 'O', '', '', '', '', '']);
    expect(getStatus()).toHaveTextContent('Next player: X');
    expect(getHistoryButtons()[2]).toHaveTextContent('Go to move #2');

    await userEvent.click(buttons[1]);
    expect(getButtonTexts()).toEqual(['X', 'X', '', 'O', '', '', '', '', '']);
    expect(getStatus()).toHaveTextContent('Next player: O');
    expect(getHistoryButtons()[3]).toHaveTextContent('Go to move #3');

    await userEvent.click(buttons[4]);
    expect(getButtonTexts()).toEqual(['X', 'X', '', 'O', 'O', '', '', '', '']);
    expect(getStatus()).toHaveTextContent('Next player: X');
    expect(getHistoryButtons()[4]).toHaveTextContent('Go to move #4');

    await userEvent.click(buttons[2]);
    expect(getButtonTexts()).toEqual(['X', 'X', 'X', 'O', 'O', '', '', '', '']);
    expect(getStatus()).toHaveTextContent('Winner: X');
    expect(getHistoryButtons()[5]).toHaveTextContent('Go to move #5');
  });

  test('shows the past board when user clicks history', async () => {
    const { buttons, getButtonTexts, getStatus, getHistoryButtons } = setUp();

    await userEvent.click(buttons[0]);
    expect(getButtonTexts()).toEqual(['X', '', '', '', '', '', '', '', '']);
    expect(getStatus()).toHaveTextContent('Next player: O');
    expect(getHistoryButtons()[1]).toHaveTextContent('Go to move #1');

    await userEvent.click(buttons[3]);
    expect(getButtonTexts()).toEqual(['X', '', '', 'O', '', '', '', '', '']);
    expect(getStatus()).toHaveTextContent('Next player: X');
    expect(getHistoryButtons()[2]).toHaveTextContent('Go to move #2');

    await userEvent.click(buttons[1]);
    expect(getButtonTexts()).toEqual(['X', 'X', '', 'O', '', '', '', '', '']);
    expect(getStatus()).toHaveTextContent('Next player: O');
    expect(getHistoryButtons()[3]).toHaveTextContent('Go to move #3');

    await userEvent.click(buttons[4]);
    expect(getButtonTexts()).toEqual(['X', 'X', '', 'O', 'O', '', '', '', '']);
    expect(getStatus()).toHaveTextContent('Next player: X');
    expect(getHistoryButtons()[4]).toHaveTextContent('Go to move #4');

    await userEvent.click(getHistoryButtons()[1].querySelector('button')!);
    expect(getButtonTexts()).toEqual(['X', '', '', '', '', '', '', '', '']);
    expect(getStatus()).toHaveTextContent('Next player: O');
  });
});
