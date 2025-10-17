import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { selectViewMode, toggleViewMode, setViewMode } from '../store/slices/viewPreferenceSlice';
import type { ViewMode } from '../store/slices/viewPreferenceSlice';

export const useViewMode = () => {
  const dispatch = useDispatch();
  const viewMode = useSelector(selectViewMode);

  const toggle = useCallback(() => {
    dispatch(toggleViewMode());
  }, [dispatch]);

  const setMode = useCallback(
    (mode: ViewMode) => {
      dispatch(setViewMode(mode));
    },
    [dispatch]
  );

  return {
    viewMode,
    toggle,
    setMode,
    isSimple: viewMode === 'simple',
    isAdvanced: viewMode === 'advanced',
  };
};
