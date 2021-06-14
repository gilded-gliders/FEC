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
import Message from './Message';

afterEach(cleanup);

it('render text correct', () => {
  const { getByTestId } = render(<Message body="kenneth@@" />);
  expect(getByTestId('textHidden')).toBeInTheDocument();
  expect(screen.queryByText('kenneth@@')).toBeInTheDocument();
});

it('render text correct after click', () => {
  const { getByTestId } = render(<Message body="kenneth@@" />);
  fireEvent.click(getByTestId('textHidden'));
  expect(getByTestId('textShow')).toBeInTheDocument();
  fireEvent.click(getByTestId('textShow'));
  expect(getByTestId('textHidden')).toBeInTheDocument();
  fireEvent.keyPress(getByTestId('textHidden'), { key: 'Enter', code: 13, charCode: 13 });
  expect(getByTestId('textShow')).toBeInTheDocument();
  fireEvent.keyPress(getByTestId('textShow'), { key: 'Enter', code: 13, charCode: 13 });
  expect(getByTestId('textHidden')).toBeInTheDocument();
});

it('matches snapShot', () => {
  const tree = renderer.create(
    <Message body="kenneth@@" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
