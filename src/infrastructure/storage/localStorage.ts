export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
  }
};

export const loadFromStorage = <T>(key: string): T | null => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) return null;
    return JSON.parse(serialized) as T;
  } catch (error) {
    console.error(`Failed to load ${key} from localStorage:`, error);
    return null;
  }
};

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove ${key} from localStorage:`, error);
  }
};

export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
};
