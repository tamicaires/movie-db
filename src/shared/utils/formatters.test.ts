import { describe, it, expect } from 'vitest';
import { formatDate, formatCurrency, formatRuntime } from './formatters';

describe('formatters', () => {
  describe('formatDate', () => {
    it('should format valid date string', () => {
      const result = formatDate('2024-06-15');
      expect(result).toBe('15/06/2024');
    });

    it('should return empty string for empty input', () => {
      expect(formatDate('')).toBe('');
    });

    it('should return empty string for invalid date', () => {
      expect(formatDate('invalid-date')).toBe('');
    });

    it('should format date consistently regardless of timezone', () => {
      // This date was causing CI failures due to timezone differences
      // Must always return day 15, not 14 or 16
      expect(formatDate('2024-01-15')).toBe('15/01/2024');
    });

    it('should handle end-of-month dates correctly', () => {
      // Edge case: timezone shift could change month
      expect(formatDate('2024-01-31')).toBe('31/01/2024');
      expect(formatDate('2024-12-31')).toBe('31/12/2024');
    });

    it('should handle beginning of year correctly', () => {
      expect(formatDate('2024-01-01')).toBe('01/01/2024');
    });

    it('should handle leap year dates', () => {
      expect(formatDate('2024-02-29')).toBe('29/02/2024');
    });
  });

  describe('formatCurrency', () => {
    it('should format number to USD currency without decimals', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000');
    });

    it('should handle zero value', () => {
      expect(formatCurrency(0)).toBe('$0');
    });

    it('should handle decimal values by rounding', () => {
      // formatCurrency uses minimumFractionDigits: 0, so rounds decimals
      expect(formatCurrency(1234.56)).toBe('$1,235');
    });

    it('should handle large numbers', () => {
      expect(formatCurrency(1000000000)).toBe('$1,000,000,000');
    });
  });

  describe('formatRuntime', () => {
    it('should format minutes to hours and minutes', () => {
      expect(formatRuntime(150)).toBe('2h 30min');
    });

    it('should format exact hours without minutes', () => {
      expect(formatRuntime(120)).toBe('2h');
    });

    it('should format only minutes when less than an hour', () => {
      expect(formatRuntime(45)).toBe('45min');
    });

    it('should return empty string for zero', () => {
      expect(formatRuntime(0)).toBe('');
    });

    it('should return empty string for null', () => {
      expect(formatRuntime(null)).toBe('');
    });

    it('should handle single minute', () => {
      expect(formatRuntime(1)).toBe('1min');
    });

    it('should handle large durations', () => {
      expect(formatRuntime(500)).toBe('8h 20min');
    });
  });
});
