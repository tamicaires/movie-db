import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { MovieCard } from './index';
import favoritesReducer from '@/presentation/store/slices/favoritesSlice';
import type { Movie } from '@/shared/types';

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-01-15',
  vote_average: 8.5,
  vote_count: 1000,
  genre_ids: [28, 12],
  popularity: 100,
  original_language: 'en',
  original_title: 'Test Movie',
  adult: false,
  video: false,
};

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: initialState,
  });
};

const renderWithProviders = (ui: React.ReactElement, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe('MovieCard', () => {
  describe('Rendering', () => {
    it('should render movie title', () => {
      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.Poster />
          <MovieCard.Info />
        </MovieCard>
      );

      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    it('should render movie poster with correct alt text', () => {
      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.Poster />
        </MovieCard>
      );

      const poster = screen.getByAltText('Poster do filme Test Movie');
      expect(poster).toBeInTheDocument();
    });

    it('should render fallback icon when no poster', () => {
      const movieWithoutPoster = { ...mockMovie, poster_path: null };
      const { container } = renderWithProviders(
        <MovieCard movie={movieWithoutPoster}>
          <MovieCard.Poster />
        </MovieCard>
      );

      const fallbackIcon = container.querySelector('[aria-hidden="true"]');
      expect(fallbackIcon).toBeInTheDocument();
    });

    it('should render movie rating', () => {
      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.Info />
        </MovieCard>
      );

      expect(screen.getByText('8.5')).toBeInTheDocument();
    });

    it('should render formatted release date', () => {
      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.Info />
        </MovieCard>
      );

      expect(screen.getByText('14/01/2024')).toBeInTheDocument();
    });
  });

  describe('Compound Components', () => {
    it('should render all subcomponents when composed', () => {
      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.Poster />
          <MovieCard.Gradient />
          <MovieCard.Info />
          <MovieCard.FavoriteButton />
        </MovieCard>
      );

      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByAltText('Poster do filme Test Movie')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /adicionar test movie aos favoritos/i })).toBeInTheDocument();
    });

    it('should allow flexible composition without Gradient', () => {
      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.Poster />
          <MovieCard.Info />
        </MovieCard>
      );

      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });
  });

  describe('Favorite functionality', () => {
    it('should show favorite button with correct aria-label', () => {
      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.FavoriteButton />
        </MovieCard>
      );

      const favoriteBtn = screen.getByRole('button', { name: /adicionar test movie aos favoritos/i });
      expect(favoriteBtn).toBeInTheDocument();
    });

    it('should toggle favorite when button is clicked', async () => {
      const user = userEvent.setup();
      const store = createMockStore();

      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.FavoriteButton />
        </MovieCard>,
        store
      );

      const favoriteBtn = screen.getByRole('button', { name: /adicionar test movie aos favoritos/i });
      await user.click(favoriteBtn);

      const state = store.getState();
      expect(state.favorites.items).toHaveLength(1);
      expect(state.favorites.items[0].id).toBe(mockMovie.id);
    });

    it('should show delete icon when variant is delete', () => {
      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.FavoriteButton variant="delete" />
        </MovieCard>
      );

      const deleteBtn = screen.getByRole('button', { name: /remover test movie dos favoritos/i });
      expect(deleteBtn).toBeInTheDocument();
    });

    it('should have aria-pressed attribute', () => {
      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.FavoriteButton />
        </MovieCard>
      );

      const favoriteBtn = screen.getByRole('button', { name: /adicionar test movie aos favoritos/i });
      expect(favoriteBtn).toHaveAttribute('aria-pressed');
    });
  });

  describe('Search highlighting', () => {
    it('should highlight search query in title', () => {
      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.Info searchQuery="Test" />
        </MovieCard>
      );

      const highlighted = screen.getByText('Test', { selector: 'mark' });
      expect(highlighted).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible link with aria-label', () => {
      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.Poster />
        </MovieCard>
      );

      const link = screen.getByRole('link', { name: /ver detalhes de test movie/i });
      expect(link).toBeInTheDocument();
    });

    it('should have correct link href', () => {
      renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.Poster />
        </MovieCard>
      );

      const link = screen.getByRole('link', { name: /ver detalhes de test movie/i });
      expect(link).toHaveAttribute('href', '/movie/1');
    });

    it('should have aria-hidden on decorative icons', () => {
      const { container } = renderWithProviders(
        <MovieCard movie={mockMovie}>
          <MovieCard.FavoriteButton />
        </MovieCard>
      );

      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
      icons.forEach((icon) => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('Context validation', () => {
    it('should throw error when subcomponents used outside MovieCard', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(
          <BrowserRouter>
            <MovieCard.Poster />
          </BrowserRouter>
        );
      }).toThrow('MovieCard compound components must be used within MovieCard');

      consoleError.mockRestore();
    });
  });
});
