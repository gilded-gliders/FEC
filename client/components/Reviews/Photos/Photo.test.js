/**
* @jest-environment jsdom
*/
import React from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Photos from './Photos';

afterEach(cleanup);

describe('render correct', () => {
  it('when photos.legnth is 0, should not show', () => {
    const test = [];
    const { getByTestId } = render(<Photos photos={test} />);
    expect(getByTestId('null')).toBeInTheDocument();
  });
  it('when photos.legnth > 0, should show', () => {
    const test = [
      { id: 1, url: 'a' },
      { id: 2, url: 'b' },
      { id: 3, url: 'c' }];
    const { getByTestId } = render(<Photos photos={test} />);
    expect(getByTestId('photos')).toBeInTheDocument();
  });
  it('when photos.legnth > 0, should img show', () => {
    const test = [
      { id: 1, url: 'a' },
      { id: 2, url: 'b' },
      { id: 3, url: 'c' }];
    const { getAllByTestId } = render(<Photos photos={test} />);
    expect(getAllByTestId('img')).toHaveLength(test.length);
  });
});

it('matches snapShot', () => {
  const test = [
    { id: 1, url: 'a' },
    { id: 2, url: 'b' },
    { id: 3, url: 'c' }];
  const tree = renderer.create(
    <Photos
      photos={test}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
