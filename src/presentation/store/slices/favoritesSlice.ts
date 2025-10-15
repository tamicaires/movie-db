import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { Movie, FavoriteSortBy } from '@/shared/types';
import { STORAGE_KEYS } from '@/shared/constants';
import { loadFromStorage, saveToStorage } from '@/infrastructure/storage/localStorage';

interface FavoritesState {
  items: Movie[];
  sortBy: FavoriteSortBy;
}

const initialState: FavoritesState = {
  items: loadFromStorage<Movie[]>(STORAGE_KEYS.FAVORITES) || [],
  sortBy: 'title-asc',
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const exists = state.items.some((movie) => movie.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveToStorage(STORAGE_KEYS.FAVORITES, state.items);
      }
    },

    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((movie) => movie.id !== action.payload);
      saveToStorage(STORAGE_KEYS.FAVORITES, state.items);
    },

    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const index = state.items.findIndex((movie) => movie.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      saveToStorage(STORAGE_KEYS.FAVORITES, state.items);
    },

    setSortBy: (state, action: PayloadAction<FavoriteSortBy>) => {
      state.sortBy = action.payload;
    },

    clearFavorites: (state) => {
      state.items = [];
      saveToStorage(STORAGE_KEYS.FAVORITES, []);
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, setSortBy, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;

export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.items;
export const selectSortBy = (state: { favorites: FavoritesState }) => state.favorites.sortBy;

export const selectIsFavorite = (movieId: number) =>
  createSelector([selectFavorites], (favorites) => favorites.some((movie) => movie.id === movieId));

export const selectSortedFavorites = createSelector(
  [selectFavorites, selectSortBy],
  (favorites, sortBy) => {
    const sorted = [...favorites];

    switch (sortBy) {
      case 'title-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'rating-asc':
        return sorted.sort((a, b) => a.vote_average - b.vote_average);
      case 'rating-desc':
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return sorted;
    }
  }
);
