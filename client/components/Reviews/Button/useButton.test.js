/**
 * @jest-environment jsdom
 */

import {
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react-hooks';
import useButton from './useButton';

afterEach(cleanup);

it('should set IsAddReview', () => {
  const testFunc = jest.fn();
  const { result } = renderHook(() => useButton(testFunc));
  expect(result.current.isAddReview).toBe(false);

  act(() => {
    result.current.handleClickAddReview();
  });
  expect(result.current.isAddReview).toBe(true);

  act(() => {
    result.current.cancelAddReview();
  });
  expect(result.current.isAddReview).toBe(false);
});

it('should call pass in func', () => {
  const testFunc = jest.fn();
  const { result } = renderHook(() => useButton(testFunc));
  act(() => {
    result.current.handleClickMoreReview();
  });
  expect(testFunc).toHaveBeenCalledTimes(1);
  act(() => {
    result.current.handleClickMoreReview();
  });
  expect(testFunc).toHaveBeenCalledTimes(2);
});
