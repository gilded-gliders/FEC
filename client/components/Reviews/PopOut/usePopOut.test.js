/**
 * @jest-environment jsdom
 */
import {
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react-hooks';
import usePopOut from './usePopOut';
import { testData1 } from '../RatingTestData';

afterEach(cleanup);
describe('should check befor add review', () => {
  const key = Object.keys(testData1.characteristics);
  const obj = {};
  for (let i = 0; i < key.length; i += 1) {
    obj[key[i]] = {
      id: testData1.characteristics[key[i]].id,
      value: 0,
    };
  }
  it('should set isShowWarning', () => {
    const addUserReview = jest.fn();
    const cancelAddReview = jest.fn();
    const { result } = renderHook(() => usePopOut({
      key, obj, data: testData1, addUserReview, cancelAddReview,
    }));
    result.current.listWarning = [{ a: 'q' }];
    expect(result.current.listWarning).toHaveLength(1);

    act(() => {
      result.current.isShowWarning();
    });
    expect(result.current.listWarning).toHaveLength(0);
  });

  it('starClick shoudl set Rating and Characteristics', () => {
    const addUserReview = jest.fn();
    const cancelAddReview = jest.fn();
    const { result } = renderHook(() => usePopOut({
      key, obj, data: testData1, addUserReview, cancelAddReview,
    }));
    act(() => {
      result.current.starClick({ target: { id: 'Stars 1' } });
    });
    expect(result.current.rating).toBe(1);
    act(() => {
      result.current.starClick({ target: { id: 'Size 2' } });
    });
    expect(result.current.characteristics.Size.value).toBe('2');
  });
});

describe('should check befor add review', () => {
  const key = Object.keys(testData1.characteristics);
  const obj = {};
  for (let i = 0; i < key.length; i += 1) {
    obj[key[i]] = {
      id: testData1.characteristics[key[i]].id,
      value: 0,
    };
  }
  it('should change target value', () => {
    const addUserReview = jest.fn();
    const cancelAddReview = jest.fn();
    const { result } = renderHook(() => usePopOut({
      key, obj, data: testData1, addUserReview, cancelAddReview,
    }));
    expect(result.current.recommend).toBe(true);
    act(() => {
      result.current.handleChangeTarget({ target: { id: 'recommend', value: 'false' } });
    });
    expect(result.current.recommend).toBe(false);
    act(() => {
      result.current.handleChangeTarget({ target: { id: 'recommend', value: 'qwe' } });
    });
    expect(result.current.recommend).toBe(true);
    act(() => {
      result.current.handleChangeTarget({ target: { id: 'body', value: 'qwe' } });
    });
    expect(result.current.body).toBe('qwe');
    act(() => {
      result.current.handleChangeTarget({ target: { id: 'photos', value: 'qwe' } });
    });
    expect(result.current.photos).toHaveLength(1);
    act(() => {
      result.current.handleChangeTarget({ target: { id: 'summary', value: 'qwe' } });
    });
    expect(result.current.userReview.summary).toBe('qwe');
  });
});

describe('should check before post review with warning', () => {
  const key = Object.keys(testData1.characteristics);
  const obj = {};
  for (let i = 0; i < key.length; i += 1) {
    obj[key[i]] = {
      id: testData1.characteristics[key[i]].id,
      value: 0,
    };
  }
  it('should check before post review with warning', () => {
    const addUserReview = jest.fn();
    const cancelAddReview = jest.fn();
    const { result } = renderHook(() => usePopOut({
      key, obj, data: testData1, addUserReview, cancelAddReview,
    }));
    expect(result.current.listWarning).toHaveLength(0);
    act(() => {
      result.current.isShowWarning();
      result.current.handleChangeTarget({ target: { id: 'summary', value: '' } });
      result.current.handleClickCheckReview();
    });
    expect(result.current.listWarning).toHaveLength(9);
  });
});

describe('should check before post review no warning', () => {
  const key = Object.keys(testData1.characteristics);
  const obj = {};
  for (let i = 0; i < key.length; i += 1) {
    obj[key[i]] = {
      id: testData1.characteristics[key[i]].id,
      value: 0,
    };
  }
  it('should check before post review no warning', () => {
    const addUserReview = jest.fn();
    const cancelAddReview = jest.fn();
    const { result } = renderHook(() => usePopOut({
      key, obj, data: testData1, addUserReview, cancelAddReview,
    }));
    act(() => {
      result.current.handleChangeTarget({ target: { id: 'body', value: 'qweqwewqewqweqwewqeqweqwewqewqweqwewqewqweqwewqewqweqwewqfefefeewqweqwewqewqwwqweqwewqewqweqwewqfefefeewqweqwewqewqw' } });
    });
    act(() => {
      result.current.handleChangeTarget({ target: { id: 'name', value: 'qwe' } });
    });
    act(() => {
      result.current.handleChangeTarget({ target: { id: 'email', value: 'qw@e' } });
    });
    act(() => {
      result.current.handleChangeTarget({ target: { id: 'summary', value: 'qwe' } });
    });
    act(() => {
      result.current.starClick({ target: { id: 'Stars 2' } });
    });
    act(() => {
      result.current.starClick({ target: { id: 'Size', value: 2 } });
    });
    act(() => {
      result.current.starClick({ target: { id: 'Comfort', value: 2 } });
    });
    act(() => {
      result.current.starClick({ target: { id: 'Quality', value: 2 } });
    });
    act(() => {
      result.current.starClick({ target: { id: 'Width', value: 2 } });
    });
    act(() => {
      result.current.handleClickCheckReview();
    });
    expect(addUserReview).toHaveBeenCalledTimes(1);
    expect(cancelAddReview).toHaveBeenCalledTimes(1);
  });
});
