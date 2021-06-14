/**
 * @jest-environment jsdom
*/
import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import Stars from './Stars';

afterEach(cleanup);

it('Stars will trigger when clicked', () => {
  const testFunc = jest.fn();
  const { getByTestId } = render(<Stars starClick={testFunc} />);
  fireEvent.click(getByTestId('button0'));
  fireEvent.click(getByTestId('button1'));
  fireEvent.click(getByTestId('button2'));
  fireEvent.click(getByTestId('button3'));
  fireEvent.click(getByTestId('button4'));
  expect(testFunc).toHaveBeenCalledTimes(5);
});

it('Stars will trigger when keypress', () => {
  const testFunc = jest.fn();
  const { getByTestId } = render(<Stars starClick={testFunc} />);
  fireEvent.keyPress(getByTestId('button0'), { key: 'Enter', code: 13, charCode: 13 });
  fireEvent.keyPress(getByTestId('button1'), { key: 'Enter', code: 13, charCode: 13 });
  fireEvent.keyPress(getByTestId('button2'), { key: 'Enter', code: 13, charCode: 13 });
  fireEvent.keyPress(getByTestId('button3'), { key: 'Enter', code: 13, charCode: 13 });
  fireEvent.keyPress(getByTestId('button4'), { key: 'Enter', code: 13, charCode: 13 });
  expect(testFunc).toHaveBeenCalledTimes(5);
});

it('should have default starClick()', () => {
  expect(Stars.defaultProps.starClick()).toBeDefined();
});

it('matches snapShot', () => {
  const tree = renderer.create(
    <Stars
      rate={1}
      classNameForSize="hi"
      starsClicked={jest.fn}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
