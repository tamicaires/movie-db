import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  toggleFavorite as toggleFavoriteAction,
  selectFavorites,
  selectSortedFavorites,
  selectSortBy,
  setSortBy,
  clearFavorites as clearFavoritesAction,
} from '../store/slices/favoritesSlice';
import type { Movie, FavoriteSortBy } from '@/shared/types';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectSortedFavorites);
  const favoritesRaw = useAppSelector(selectFavorites);
  const sortBy = useAppSelector(selectSortBy);

  const favoriteIds = useMemo(() => new Set(favoritesRaw.map((movie) => movie.id)), [favoritesRaw]);

  const isFavorite = useCallback(
    (movieId: number) => {
      return favoriteIds.has(movieId);
    },
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      dispatch(toggleFavoriteAction(movie));
    },
    [dispatch]
  );

  const changeSortBy = useCallback(
    (newSortBy: FavoriteSortBy) => {
      dispatch(setSortBy(newSortBy));
    },
    [dispatch]
  );

  const clearFavorites = useCallback(() => {
    dispatch(clearFavoritesAction());
  }, [dispatch]);

  return {
    favorites,
    sortBy,
    isFavorite,
    toggleFavorite,
    setSortBy: changeSortBy,
    clearFavorites,
    favoritesCount: favorites.length,
  };
};
