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
import '@testing-library/jest-dom';
import HelpfulMSG from './HelpfulMSG';

afterEach(cleanup);

it('should render corrcet number', () => {
  const test = 23;
  const test1 = 52;
  render(
    <HelpfulMSG
      countHelpful={test}
      countNotHelpful={test1}
    />,
  );
  expect(screen.queryByText('countHelpful? Yes (23)')).toBeInTheDocument();
  expect(screen.queryByText('No (52)')).toBeInTheDocument();
  expect(screen.queryByText('| report')).toBeInTheDocument();
});

it('should trigger button to change text one time only', () => {
  const test = 23;
  const test1 = 52;
  const { getByTestId } = render(
    <HelpfulMSG
      countHelpful={test}
      countNotHelpful={test1}
    />,
  );
  fireEvent.click(getByTestId('helpfulButton'));
  fireEvent.click(getByTestId('helpfulButton'));
  expect(getByTestId('helpfulButton')).toHaveTextContent('countHelpful? Yes (24)');
});

it('should trigger button to change text one time only', () => {
  const test = 23;
  const test1 = 52;
  const { getByTestId } = render(
    <HelpfulMSG
      countHelpful={test}
      countNotHelpful={test1}
    />,
  );
  fireEvent.click(getByTestId('nothelpfulButton'));
  expect(getByTestId('nothelpfulButton')).toHaveTextContent('No (53)');
  fireEvent.click(getByTestId('nothelpfulButton'));
  expect(getByTestId('nothelpfulButton')).toHaveTextContent('No (53)');
});

it('should trigger button to change text one time only', () => {
  const test = 23;
  const test1 = 52;
  const testfunc = jest.fn();
  const { getByTestId } = render(
    <HelpfulMSG
      countHelpful={test}
      countNotHelpful={test1}
      reported={testfunc}
    />,
  );
  fireEvent.click(getByTestId('report'));
  expect(testfunc).toHaveBeenCalledTimes(1);
});

it('should have default reported', () => {
  expect(HelpfulMSG.defaultProps.reported()).toBeDefined();
});

it('matches snapShot', () => {
  const tree = renderer.create(
    <HelpfulMSG
      countHelpful={23}
      countNotHelpful={52}
      reported={jest.fn()}
      reviewId={25711}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
