import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Adiciona matchers customizados do testing-library
expect.extend(matchers);

// Cleanup após cada teste (remove componentes do DOM)
afterEach(() => {
  cleanup();
});
