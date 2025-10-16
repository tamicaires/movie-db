import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveToStorage, loadFromStorage, removeFromStorage } from './localStorage';

describe('localStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('saveToStorage', () => {
    it('should save data to localStorage', () => {
      const data = { id: 1, name: 'Test' };
      saveToStorage('test-key', data);

      const stored = localStorage.getItem('test-key');
      expect(stored).toBe(JSON.stringify(data));
    });

    it('should handle complex objects', () => {
      const data = {
        user: { id: 1, name: 'John' },
        settings: { theme: 'dark', notifications: true },
        items: [1, 2, 3],
      };
      saveToStorage('complex-key', data);

      const stored = JSON.parse(localStorage.getItem('complex-key')!);
      expect(stored).toEqual(data);
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
        throw new Error('Storage full');
      });

      expect(() => saveToStorage('error-key', { data: 'test' })).not.toThrow();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('loadFromStorage', () => {
    it('should load data from localStorage', () => {
      const data = { id: 1, name: 'Test' };
      localStorage.setItem('test-key', JSON.stringify(data));

      const loaded = loadFromStorage<typeof data>('test-key');
      expect(loaded).toEqual(data);
    });

    it('should return null for non-existent key', () => {
      const loaded = loadFromStorage('non-existent');
      expect(loaded).toBeNull();
    });

    it('should return null for invalid JSON', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem('invalid-json', 'not valid json{');

      const loaded = loadFromStorage('invalid-json');
      expect(loaded).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should handle different data types', () => {
      const stringData = 'test string';
      const numberData = 42;
      const booleanData = true;
      const arrayData = [1, 2, 3];

      saveToStorage('string', stringData);
      saveToStorage('number', numberData);
      saveToStorage('boolean', booleanData);
      saveToStorage('array', arrayData);

      expect(loadFromStorage<string>('string')).toBe(stringData);
      expect(loadFromStorage<number>('number')).toBe(numberData);
      expect(loadFromStorage<boolean>('boolean')).toBe(booleanData);
      expect(loadFromStorage<number[]>('array')).toEqual(arrayData);
    });
  });

  describe('removeFromStorage', () => {
    it('should remove data from localStorage', () => {
      localStorage.setItem('test-key', 'test-value');
      expect(localStorage.getItem('test-key')).toBe('test-value');

      removeFromStorage('test-key');
      expect(localStorage.getItem('test-key')).toBeNull();
    });

    it('should not throw error for non-existent key', () => {
      expect(() => removeFromStorage('non-existent')).not.toThrow();
    });
  });

  describe('integration', () => {
    it('should save, load, and remove data correctly', () => {
      const data = { user: 'John', age: 30 };

      saveToStorage('user-data', data);
      expect(loadFromStorage('user-data')).toEqual(data);

      removeFromStorage('user-data');
      expect(loadFromStorage('user-data')).toBeNull();
    });

    it('should handle multiple keys', () => {
      saveToStorage('key1', 'value1');
      saveToStorage('key2', 'value2');
      saveToStorage('key3', 'value3');

      expect(loadFromStorage('key1')).toBe('value1');
      expect(loadFromStorage('key2')).toBe('value2');
      expect(loadFromStorage('key3')).toBe('value3');

      removeFromStorage('key2');
      expect(loadFromStorage('key1')).toBe('value1');
      expect(loadFromStorage('key2')).toBeNull();
      expect(loadFromStorage('key3')).toBe('value3');
    });
  });
});
