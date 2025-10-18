import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './index';

describe('LoadingSpinner', () => {
  describe('Rendering', () => {
    it('should render loading spinner', () => {
      const { container } = render(<LoadingSpinner />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render spinner element', () => {
      const { container } = render(<LoadingSpinner />);

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have role="status"', () => {
      render(<LoadingSpinner />);

      const statusElement = screen.getByRole('status');
      expect(statusElement).toBeInTheDocument();
    });

    it('should have aria-live="polite"', () => {
      render(<LoadingSpinner />);

      const statusElement = screen.getByRole('status');
      expect(statusElement).toHaveAttribute('aria-live', 'polite');
    });

    it('should have descriptive aria-label', () => {
      render(<LoadingSpinner />);

      const statusElement = screen.getByRole('status');
      expect(statusElement).toHaveAttribute('aria-label', 'Carregando conteúdo');
    });

    it('should announce loading to screen readers', () => {
      render(<LoadingSpinner />);

      // Verify it's accessible via aria-label
      const loadingMessage = screen.getByLabelText('Carregando conteúdo');
      expect(loadingMessage).toBeInTheDocument();
    });

    it('should hide visual spinner from screen readers', () => {
      const { container } = render(<LoadingSpinner />);

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
    });

    it('should provide status updates without being intrusive', () => {
      render(<LoadingSpinner />);

      const statusElement = screen.getByRole('status');
      // aria-live="polite" means it won't interrupt current announcements
      expect(statusElement).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Styling', () => {
    it('should have centered layout', () => {
      const { container } = render(<LoadingSpinner />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('flex', 'items-center', 'justify-center');
    });

    it('should have proper padding', () => {
      const { container } = render(<LoadingSpinner />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('p-8');
    });

    it('should have spinner with correct size', () => {
      const { container } = render(<LoadingSpinner />);

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('h-12', 'w-12');
    });

    it('should have spinner with rounded shape', () => {
      const { container } = render(<LoadingSpinner />);

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('rounded-full');
    });

    it('should have spinner with border styling', () => {
      const { container } = render(<LoadingSpinner />);

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('border-4', 'border-gray-300', 'border-t-primary-600');
    });

    it('should have animation class', () => {
      const { container } = render(<LoadingSpinner />);

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('animate-spin');
    });
  });

  describe('Structure', () => {
    it('should have correct DOM structure', () => {
      const { container } = render(<LoadingSpinner />);

      // Outer wrapper
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.tagName).toBe('DIV');

      // Inner spinner
      const spinner = wrapper.firstChild as HTMLElement;
      expect(spinner.tagName).toBe('DIV');
      expect(spinner).toHaveClass('animate-spin');
    });

    it('should have status wrapper as parent of spinner', () => {
      const { container } = render(<LoadingSpinner />);

      const statusWrapper = container.querySelector('[role="status"]');
      const spinner = container.querySelector('.animate-spin') as HTMLElement;

      expect(statusWrapper).toContainElement(spinner);
    });
  });

  describe('Screen reader experience', () => {
    it('should be findable by role', () => {
      render(<LoadingSpinner />);

      const status = screen.getByRole('status');
      expect(status).toBeInTheDocument();
    });

    it('should be findable by label', () => {
      render(<LoadingSpinner />);

      const loading = screen.getByLabelText('Carregando conteúdo');
      expect(loading).toBeInTheDocument();
    });

    it('should not expose visual spinner to screen readers', () => {
      const { container } = render(<LoadingSpinner />);

      // Visual spinner should have aria-hidden
      const spinner = container.querySelector('[aria-hidden="true"]');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
    });
  });

  describe('Multiple instances', () => {
    it('should render multiple spinners independently', () => {
      const { container } = render(
        <>
          <LoadingSpinner />
          <LoadingSpinner />
        </>
      );

      const spinners = container.querySelectorAll('.animate-spin');
      expect(spinners).toHaveLength(2);
    });

    it('should have multiple status regions', () => {
      render(
        <>
          <LoadingSpinner />
          <LoadingSpinner />
        </>
      );

      const statuses = screen.getAllByRole('status');
      expect(statuses).toHaveLength(2);
    });
  });
});
