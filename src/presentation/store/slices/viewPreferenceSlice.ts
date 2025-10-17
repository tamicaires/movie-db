import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '@/shared/constants';
import { loadFromStorage, saveToStorage } from '@/infrastructure/storage/localStorage';

export type ViewMode = 'simple' | 'advanced';

interface ViewPreferenceState {
  mode: ViewMode;
}

const initialState: ViewPreferenceState = {
  mode: loadFromStorage<ViewMode>(STORAGE_KEYS.VIEW_MODE) || 'simple',
};

const viewPreferenceSlice = createSlice({
  name: 'viewPreference',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.mode = action.payload;
      saveToStorage(STORAGE_KEYS.VIEW_MODE, action.payload);
    },
    toggleViewMode: (state) => {
      state.mode = state.mode === 'simple' ? 'advanced' : 'simple';
      saveToStorage(STORAGE_KEYS.VIEW_MODE, state.mode);
    },
  },
});

export const { setViewMode, toggleViewMode } = viewPreferenceSlice.actions;

export default viewPreferenceSlice.reducer;

export const selectViewMode = (state: { viewPreference: ViewPreferenceState }) =>
  state.viewPreference.mode;
