/**
 * @jest-environment jsdom
 */

import {
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react-hooks';
import useMessage from './useMessage';

afterEach(cleanup);

it('should set click', () => {
  const { result } = renderHook(useMessage);
  expect(result.current.isClick).toBe(false);

  act(() => {
    result.current.handleClickText();
  });
  expect(result.current.isClick).toBe(true);

  act(() => {
    result.current.handleClickText();
  });
  expect(result.current.isClick).toBe(false);

  act(() => {
    result.current.handleKeyPressText();
  });
  expect(result.current.isClick).toBe(true);

  act(() => {
    result.current.handleKeyPressText();
  });
  expect(result.current.isClick).toBe(false);
});
