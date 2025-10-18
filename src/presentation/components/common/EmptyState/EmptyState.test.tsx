import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './index';
import { MdFavorite } from 'react-icons/md';

describe('EmptyState', () => {
  describe('Rendering', () => {
    it('should render title', () => {
      render(<EmptyState title="No results found" />);

      const title = screen.getByRole('heading', { level: 3, name: 'No results found' });
      expect(title).toBeInTheDocument();
    });

    it('should render description when provided', () => {
      render(<EmptyState title="No favorites" description="Start adding your favorite movies" />);

      expect(screen.getByText('Start adding your favorite movies')).toBeInTheDocument();
    });

    it('should not render description when not provided', () => {
      const { container } = render(<EmptyState title="Empty" />);

      const description = container.querySelector('p');
      expect(description).not.toBeInTheDocument();
    });

    it('should render icon when provided', () => {
      render(<EmptyState title="No favorites" icon={<MdFavorite data-testid="favorite-icon" />} />);

      expect(screen.getByTestId('favorite-icon')).toBeInTheDocument();
    });

    it('should not render icon when not provided', () => {
      render(<EmptyState title="Empty" />);

      // Icon should not be present
      const icon = screen.queryByTestId('favorite-icon');
      expect(icon).not.toBeInTheDocument();
    });

    it('should render action when provided', () => {
      render(
        <EmptyState
          title="No results"
          action={<button data-testid="action-button">Try again</button>}
        />
      );

      expect(screen.getByTestId('action-button')).toBeInTheDocument();
      expect(screen.getByText('Try again')).toBeInTheDocument();
    });

    it('should not render action when not provided', () => {
      render(<EmptyState title="Empty" />);

      // If action is not provided, no button should be rendered
      const button = screen.queryByRole('button');
      expect(button).not.toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('should render all props together', () => {
      render(
        <EmptyState
          title="No favorites yet"
          description="Add movies to your favorites list"
          icon={<MdFavorite data-testid="icon" />}
          action={<button data-testid="action">Browse movies</button>}
        />
      );

      expect(screen.getByRole('heading', { name: 'No favorites yet' })).toBeInTheDocument();
      expect(screen.getByText('Add movies to your favorites list')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByTestId('action')).toBeInTheDocument();
    });

    it('should have correct heading level', () => {
      render(<EmptyState title="Test Title" />);

      const heading = screen.getByText('Test Title');
      expect(heading.tagName).toBe('H3');
    });

    it('should have correct description element', () => {
      render(<EmptyState title="Title" description="Test description" />);

      const description = screen.getByText('Test description');
      expect(description.tagName).toBe('P');
    });
  });

  describe('Accessibility', () => {
    it('should hide icon from screen readers with aria-hidden', () => {
      const { container } = render(
        <EmptyState title="Test" icon={<MdFavorite data-testid="icon" />} />
      );

      // The wrapper around icon should have aria-hidden="true"
      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
    });

    it('should keep title accessible for screen readers', () => {
      render(<EmptyState title="No results found" />);

      const title = screen.getByRole('heading', { name: 'No results found' });
      expect(title).toBeVisible();
      expect(title).not.toHaveAttribute('aria-hidden');
    });

    it('should keep description accessible for screen readers', () => {
      render(<EmptyState title="Title" description="Important message" />);

      const description = screen.getByText('Important message');
      expect(description).toBeVisible();
      expect(description).not.toHaveAttribute('aria-hidden');
    });

    it('should keep action accessible for screen readers', () => {
      render(<EmptyState title="Test" action={<button aria-label="Try again">Retry</button>} />);

      const button = screen.getByRole('button', { name: 'Try again' });
      expect(button).toBeInTheDocument();
      expect(button).toBeVisible();
    });
  });

  describe('Styling', () => {
    it('should have centered layout classes', () => {
      const { container } = render(<EmptyState title="Test" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center');
    });

    it('should have text-center class', () => {
      const { container } = render(<EmptyState title="Test" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('text-center');
    });

    it('should have proper spacing', () => {
      const { container } = render(<EmptyState title="Test" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('p-12');
    });
  });

  describe('Use cases', () => {
    it('should work as empty favorites state', () => {
      render(
        <EmptyState
          title="Nenhum favorito ainda"
          description="Adicione filmes à sua lista de favoritos"
          icon={<MdFavorite />}
        />
      );

      expect(screen.getByText('Nenhum favorito ainda')).toBeInTheDocument();
    });

    it('should work as empty search results', () => {
      render(
        <EmptyState
          title="Nenhum resultado encontrado"
          description="Tente buscar por outro termo"
        />
      );

      expect(screen.getByText('Nenhum resultado encontrado')).toBeInTheDocument();
    });

    it('should work as error state with action', () => {
      render(
        <EmptyState
          title="Algo deu errado"
          description="Não foi possível carregar os dados"
          action={<button>Tentar novamente</button>}
        />
      );

      expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
