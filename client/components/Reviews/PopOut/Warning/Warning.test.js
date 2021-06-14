/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  cleanup,
  fireEvent,
  screen,
} from '@testing-library/react';
import Warning from './Warning';

afterEach(cleanup);

const testArray = ['A', 'B', 'C'];
const testFunc = () => { testArray.push('D'); };

it('Waring will render all the warnings', () => {
  const { getAllByTestId } = render(<Warning listWarning={testArray} />);
  const mapArray = getAllByTestId('WarningItems').map((i) => i.innerHTML);
  expect(JSON.stringify(mapArray.length)).toEqual(JSON.stringify(testArray.length));
});

it('Warning will trigger when clicked', () => {
  const handleClick = jest.fn();
  // const { getByTestId } = render(<Warning show={handleClick} />);
  render(<Warning isShowWarning={handleClick} />);
  fireEvent.click(screen.getByTestId('WarningButton'));
  // fireEvent.click(getByTestId('WarningButton'));
  expect(handleClick).toHaveBeenCalledTimes(1);
  // expect(testArray.length).toBe(4);
});

it('should have default isShowWarning()', () => {
  expect(Warning.defaultProps.isShowWarning()).toBeDefined();
});

it('matches snapShot', () => {
  const tree = renderer.create(
    <Warning
      listWarning={testArray}
      isShowWarning={testFunc}
    />,
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
