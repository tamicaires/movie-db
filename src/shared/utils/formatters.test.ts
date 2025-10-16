import { describe, it, expect } from 'vitest';
import { formatDate, formatCurrency, formatRuntime } from './formatters';

describe('formatters', () => {
  describe('formatDate', () => {
    it('should format valid date string', () => {
      const result = formatDate('2024-06-15');
      // Check it returns a valid date pattern (DD/MM/YYYY)
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty string for empty input', () => {
      expect(formatDate('')).toBe('');
    });

    it('should return empty string for invalid date', () => {
      expect(formatDate('invalid-date')).toBe('');
    });

    it('should handle year correctly', () => {
      const result = formatDate('2024-06-15');
      expect(result).toContain('2024');
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
