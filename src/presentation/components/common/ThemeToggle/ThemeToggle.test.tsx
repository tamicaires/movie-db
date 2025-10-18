import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './index';
import { ThemeProvider } from '@/presentation/contexts/ThemeContext';

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

// Clear localStorage after each test
afterEach(() => {
  localStorage.clear();
});

const renderWithThemeProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ThemeToggle', () => {
  describe('Rendering', () => {
    it('should render toggle button', () => {
      renderWithThemeProvider(<ThemeToggle />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should show moon icon in light theme', () => {
      renderWithThemeProvider(<ThemeToggle />);

      const button = screen.getByRole('button', { name: /ativar tema escuro/i });
      expect(button).toBeInTheDocument();
    });

    it('should show sun icon in dark theme', () => {
      // Set dark theme in localStorage (key must match ThemeContext: 'app-theme')
      localStorage.setItem('app-theme', JSON.stringify('dark'));

      renderWithThemeProvider(<ThemeToggle />);

      const button = screen.getByRole('button', { name: /ativar tema claro/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have dynamic aria-label based on current theme', () => {
      renderWithThemeProvider(<ThemeToggle />);

      // Default is light theme
      const button = screen.getByRole('button', { name: /ativar tema escuro/i });
      expect(button).toHaveAttribute('aria-label', 'Ativar tema escuro');
    });

    it('should have aria-pressed attribute', () => {
      renderWithThemeProvider(<ThemeToggle />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed');
    });

    it('should have aria-pressed="false" in light theme', () => {
      renderWithThemeProvider(<ThemeToggle />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    it('should have aria-pressed="true" in dark theme', () => {
      localStorage.setItem('app-theme', JSON.stringify('dark'));

      renderWithThemeProvider(<ThemeToggle />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('should have title attribute for tooltip', () => {
      renderWithThemeProvider(<ThemeToggle />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title');
    });

    it('should have icons with aria-hidden="true"', () => {
      const { container } = renderWithThemeProvider(<ThemeToggle />);

      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Functionality', () => {
    it('should toggle theme on click', async () => {
      const user = userEvent.setup();
      renderWithThemeProvider(<ThemeToggle />);

      // Initial state: light theme
      let button = screen.getByRole('button', { name: /ativar tema escuro/i });
      expect(button).toHaveAttribute('aria-pressed', 'false');

      // Click to toggle to dark
      await user.click(button);

      // Should now be dark theme
      button = screen.getByRole('button', { name: /ativar tema claro/i });
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('should toggle back to light theme', async () => {
      const user = userEvent.setup();
      localStorage.setItem('app-theme', JSON.stringify('dark'));

      renderWithThemeProvider(<ThemeToggle />);

      // Initial state: dark theme
      let button = screen.getByRole('button', { name: /ativar tema claro/i });
      expect(button).toHaveAttribute('aria-pressed', 'true');

      // Click to toggle to light
      await user.click(button);

      // Should now be light theme
      button = screen.getByRole('button', { name: /ativar tema escuro/i });
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    it('should persist theme preference in localStorage', async () => {
      const user = userEvent.setup();
      renderWithThemeProvider(<ThemeToggle />);

      const button = screen.getByRole('button');
      await user.click(button);

      // Check localStorage (stored as JSON)
      expect(localStorage.getItem('app-theme')).toBe(JSON.stringify('dark'));
    });
  });

  describe('Theme states', () => {
    it('should respect initial theme from localStorage', () => {
      localStorage.setItem('app-theme', JSON.stringify('dark'));

      renderWithThemeProvider(<ThemeToggle />);

      const button = screen.getByRole('button', { name: /ativar tema claro/i });
      expect(button).toBeInTheDocument();
    });

    it('should default to light theme when localStorage is empty', () => {
      renderWithThemeProvider(<ThemeToggle />);

      const button = screen.getByRole('button', { name: /ativar tema escuro/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Multiple toggles', () => {
    it('should handle multiple consecutive clicks', async () => {
      const user = userEvent.setup();
      renderWithThemeProvider(<ThemeToggle />);

      const button = screen.getByRole('button');

      // Click 1: light -> dark
      await user.click(button);
      expect(screen.getByRole('button', { name: /ativar tema claro/i })).toBeInTheDocument();

      // Click 2: dark -> light
      await user.click(button);
      expect(screen.getByRole('button', { name: /ativar tema escuro/i })).toBeInTheDocument();

      // Click 3: light -> dark
      await user.click(button);
      expect(screen.getByRole('button', { name: /ativar tema claro/i })).toBeInTheDocument();
    });
  });
});
