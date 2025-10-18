import { describe, it, expect, beforeEach, vi } from 'vitest';
import favoritesReducer, {
  toggleFavorite,
  clearFavorites,
  setSortBy,
  selectFavorites,
  selectSortBy,
  selectSortedFavorites,
} from './favoritesSlice';
import type { Movie } from '@/shared/types';
import type { RootState } from '@/presentation/store';

vi.mock('@/infrastructure/storage/localStorage', () => ({
  saveToStorage: vi.fn(),
  loadFromStorage: vi.fn(() => null),
}));

describe('favoritesSlice', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test overview',
    poster_path: '/test.jpg',
    backdrop_path: '/backdrop.jpg',
    release_date: '2024-01-01',
    vote_average: 8.5,
    vote_count: 1000,
    popularity: 100,
    genre_ids: [1, 2],
    adult: false,
    original_language: 'en',
    original_title: 'Test Movie',
    video: false,
  };

  const mockMovie2: Movie = {
    ...mockMovie,
    id: 2,
    title: 'Another Movie',
    vote_average: 7.5,
    release_date: '2023-01-01',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('reducer', () => {
    it('should return initial state', () => {
      expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual({
        items: [],
        sortBy: 'date-desc',
      });
    });

    it('should add movie to favorites', () => {
      const state = favoritesReducer(undefined, toggleFavorite(mockMovie));
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual(mockMovie);
    });

    it('should remove movie from favorites when already exists', () => {
      const initialState = {
        items: [mockMovie],
        sortBy: 'date-desc' as const,
      };
      const state = favoritesReducer(initialState, toggleFavorite(mockMovie));
      expect(state.items).toHaveLength(0);
    });

    it('should clear all favorites', () => {
      const initialState = {
        items: [mockMovie, mockMovie2],
        sortBy: 'date-desc' as const,
      };
      const state = favoritesReducer(initialState, clearFavorites());
      expect(state.items).toHaveLength(0);
    });

    it('should change sort order', () => {
      const state = favoritesReducer(undefined, setSortBy('title-asc'));
      expect(state.sortBy).toBe('title-asc');
    });
  });

  describe('selectors', () => {
    const mockState = {
      favorites: {
        items: [mockMovie, mockMovie2],
        sortBy: 'date-desc' as const,
      },
    };

    it('should select favorites items', () => {
      expect(selectFavorites(mockState as unknown as RootState)).toEqual([mockMovie, mockMovie2]);
    });

    it('should select sort by', () => {
      expect(selectSortBy(mockState as unknown as RootState)).toBe('date-desc');
    });

    it('should sort by title ascending', () => {
      const state = {
        ...mockState,
        favorites: { ...mockState.favorites, sortBy: 'title-asc' as const },
      };
      const sorted = selectSortedFavorites(state as unknown as RootState);
      expect(sorted[0].title).toBe('Another Movie');
      expect(sorted[1].title).toBe('Test Movie');
    });

    it('should sort by title descending', () => {
      const state = {
        ...mockState,
        favorites: { ...mockState.favorites, sortBy: 'title-desc' as const },
      };
      const sorted = selectSortedFavorites(state as unknown as RootState);
      expect(sorted[0].title).toBe('Test Movie');
      expect(sorted[1].title).toBe('Another Movie');
    });

    it('should sort by rating descending', () => {
      const state = {
        ...mockState,
        favorites: { ...mockState.favorites, sortBy: 'rating-desc' as const },
      };
      const sorted = selectSortedFavorites(state as unknown as RootState);
      expect(sorted[0].vote_average).toBe(8.5);
      expect(sorted[1].vote_average).toBe(7.5);
    });

    it('should sort by rating ascending', () => {
      const state = {
        ...mockState,
        favorites: { ...mockState.favorites, sortBy: 'rating-asc' as const },
      };
      const sorted = selectSortedFavorites(state as unknown as RootState);
      expect(sorted[0].vote_average).toBe(7.5);
      expect(sorted[1].vote_average).toBe(8.5);
    });

    it('should sort by date descending (most recent first)', () => {
      const state = {
        ...mockState,
        favorites: { ...mockState.favorites, sortBy: 'date-desc' as const },
      };
      const sorted = selectSortedFavorites(state as unknown as RootState);
      expect(sorted[0].release_date).toBe('2024-01-01');
      expect(sorted[1].release_date).toBe('2023-01-01');
    });

    it('should sort by date ascending (oldest first)', () => {
      const state = {
        ...mockState,
        favorites: { ...mockState.favorites, sortBy: 'date-asc' as const },
      };
      const sorted = selectSortedFavorites(state as unknown as RootState);
      expect(sorted[0].release_date).toBe('2023-01-01');
      expect(sorted[1].release_date).toBe('2024-01-01');
    });
  });
});
