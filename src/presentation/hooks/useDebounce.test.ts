import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial');

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should cancel previous timeout on rapid changes', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'first' },
    });

    rerender({ value: 'second' });
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    rerender({ value: 'third' });
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('first');

    await act(async () => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('third');
  });

  it('should handle different delay values', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'test', delay: 1000 },
    });

    rerender({ value: 'updated', delay: 1000 });

    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('test');

    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should handle non-string values', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 123 },
    });

    expect(result.current).toBe(123);

    rerender({ value: 456 });
    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(456);
  });
});
