import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Header } from './index';
import favoritesReducer from '@/presentation/store/slices/favoritesSlice';
import viewPreferenceReducer from '@/presentation/store/slices/viewPreferenceSlice';
import { ThemeProvider } from '@/presentation/contexts/ThemeContext';
import { ROUTES } from '@/shared/constants';

// Mock window.matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
});

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
      viewPreference: viewPreferenceReducer,
    },
    preloadedState: initialState,
  });
};

const renderWithProviders = (
  ui: React.ReactElement,
  {
    store = createMockStore(),
    route = '/',
  }: { store?: ReturnType<typeof createMockStore>; route?: string } = {}
) => {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
};

describe('Header', () => {
  describe('Rendering', () => {
    it('should render logo', () => {
      renderWithProviders(<Header />);

      expect(screen.getByText('Movie', { selector: 'span' })).toBeInTheDocument();
      expect(screen.getByText('DB', { selector: 'span' })).toBeInTheDocument();
    });

    it('should render search bar', () => {
      renderWithProviders(<Header />);

      expect(screen.getByPlaceholderText('Buscar filmes...')).toBeInTheDocument();
    });

    it('should render navigation links', () => {
      renderWithProviders(<Header />);

      expect(screen.getByRole('link', { name: /ir para home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /ir para favoritos/i })).toBeInTheDocument();
    });

    it('should render theme toggle', () => {
      renderWithProviders(<Header />);

      const themeToggle = screen.getByRole('button', { name: /ativar tema (escuro|claro)/i });
      expect(themeToggle).toBeInTheDocument();
      expect(themeToggle).toHaveAttribute('aria-pressed');
    });
  });

  describe('Navigation', () => {
    it('should highlight active route (Home)', () => {
      renderWithProviders(<Header />, { route: ROUTES.HOME });

      const homeLink = screen.getByRole('link', { name: /ir para home/i });
      expect(homeLink).toHaveAttribute('aria-current', 'page');
      expect(homeLink).toHaveClass('bg-primary');
    });

    it('should highlight active route (Favorites)', () => {
      renderWithProviders(<Header />, { route: ROUTES.FAVORITES });

      const favoritesLink = screen.getByRole('link', { name: /ir para favoritos/i });
      expect(favoritesLink).toHaveAttribute('aria-current', 'page');
      expect(favoritesLink).toHaveClass('bg-primary');
    });

    it('should not highlight inactive routes', () => {
      renderWithProviders(<Header />, { route: ROUTES.HOME });

      const favoritesLink = screen.getByRole('link', { name: /ir para favoritos/i });
      expect(favoritesLink).not.toHaveAttribute('aria-current', 'page');
      expect(favoritesLink).not.toHaveClass('bg-primary');
    });
  });

  describe('Favorites badge', () => {
    it('should not show badge when no favorites', () => {
      const store = createMockStore({
        favorites: { items: [], sortBy: 'date-desc' },
      });

      renderWithProviders(<Header />, { store });

      const favoritesLink = screen.getByRole('link', { name: /ir para favoritos/i });
      expect(favoritesLink.textContent).toBe('Favoritos');
    });

    it('should show badge with count when has favorites', () => {
      const store = createMockStore({
        favorites: {
          items: [
            { id: 1, title: 'Movie 1', release_date: '2024-01-01', vote_average: 8.0 },
            { id: 2, title: 'Movie 2', release_date: '2024-01-02', vote_average: 7.0 },
            { id: 3, title: 'Movie 3', release_date: '2024-01-03', vote_average: 9.0 },
          ],
          sortBy: 'date-desc',
        },
      });

      renderWithProviders(<Header />, { store });

      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should update aria-label with favorites count', () => {
      const store = createMockStore({
        favorites: {
          items: [
            { id: 1, title: 'Movie 1', release_date: '2024-01-01', vote_average: 8.0 },
            { id: 2, title: 'Movie 2', release_date: '2024-01-02', vote_average: 7.0 },
          ],
          sortBy: 'date-desc',
        },
      });

      renderWithProviders(<Header />, { store });

      const favoritesLink = screen.getByRole('link', { name: /ir para favoritos \(2 filmes\)/i });
      expect(favoritesLink).toBeInTheDocument();
    });
  });

  describe('View mode toggle', () => {
    it('should show view mode toggle only on home page', () => {
      renderWithProviders(<Header />, { route: ROUTES.HOME });

      const viewModeToggle = screen.getByRole('button', { name: /toggle view mode/i });
      expect(viewModeToggle).toBeInTheDocument();
    });

    it('should not show view mode toggle on other pages', () => {
      renderWithProviders(<Header />, { route: ROUTES.FAVORITES });

      const viewModeToggle = screen.queryByRole('button', { name: /toggle view mode/i });
      expect(viewModeToggle).not.toBeInTheDocument();
    });

    it('should have view mode toggle button', () => {
      const store = createMockStore({
        viewPreference: { viewMode: 'simple' },
      });

      renderWithProviders(<Header />, { store, route: ROUTES.HOME });

      const viewModeToggle = screen.getByRole('button', { name: /toggle view mode/i });
      expect(viewModeToggle).toBeInTheDocument();
    });
  });

  describe('Search functionality', () => {
    it('should update search query from URL params on search page', () => {
      renderWithProviders(<Header />, { route: '/search?q=avengers' });

      const searchInput = screen.getByPlaceholderText('Buscar filmes...') as HTMLInputElement;
      expect(searchInput.value).toBe('avengers');
    });

    it('should have empty search query on non-search pages', () => {
      renderWithProviders(<Header />, { route: ROUTES.HOME });

      const searchInput = screen.getByPlaceholderText('Buscar filmes...') as HTMLInputElement;
      expect(searchInput.value).toBe('');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on logo link', () => {
      renderWithProviders(<Header />);

      const logoLink = screen.getByRole('link', { name: /ir para página inicial/i });
      expect(logoLink).toBeInTheDocument();
    });

    it('should have aria-hidden on decorative icons', () => {
      renderWithProviders(<Header />);

      const homeLink = screen.getByRole('link', { name: /ir para home/i });
      const icon = homeLink.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it('should have correct aria-current on active page', () => {
      renderWithProviders(<Header />, { route: ROUTES.HOME });

      const homeLink = screen.getByRole('link', { name: /ir para home/i });
      expect(homeLink).toHaveAttribute('aria-current', 'page');
    });

    it('should have descriptive aria-label on view mode toggle', () => {
      renderWithProviders(<Header />, { route: ROUTES.HOME });

      const viewModeToggle = screen.getByRole('button', { name: /toggle view mode/i });
      expect(viewModeToggle).toHaveAttribute('title');
    });

    it('should have badge hidden from screen readers when link provides context', () => {
      const store = createMockStore({
        favorites: {
          items: [{ id: 1, title: 'Movie 1', release_date: '2024-01-01', vote_average: 8.0 }],
          sortBy: 'date-desc',
        },
      });

      renderWithProviders(<Header />, { store });

      // Badge should be aria-hidden since parent link already has the count
      const favoritesLink = screen.getByRole('link', {
        name: /ir para favoritos \(1 filme[s]?\)/i,
      });
      expect(favoritesLink).toBeInTheDocument();

      // Verify badge is present but hidden from screen readers
      const badge = screen.getByText('1');
      expect(badge).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Responsive behavior', () => {
    it('should hide logo text on small screens', () => {
      const { container } = renderWithProviders(<Header />);

      const logoContainer = container.querySelector('.hidden.sm\\:inline');
      expect(logoContainer).toBeInTheDocument();
    });
  });
});
