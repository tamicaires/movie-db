import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  toggleFavorite as toggleFavoriteAction,
  selectFavorites,
  selectSortedFavorites,
  setSortBy,
} from '../store/slices/favoritesSlice';
import type { Movie, FavoriteSortBy } from '@/shared/types';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectSortedFavorites);
  const favoritesRaw = useAppSelector(selectFavorites);

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
    (sortBy: FavoriteSortBy) => {
      dispatch(setSortBy(sortBy));
    },
    [dispatch]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    changeSortBy,
    favoritesCount: favorites.length,
  };
};
