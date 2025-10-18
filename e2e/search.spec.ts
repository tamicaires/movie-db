import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should search for movies and display results', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/buscar filmes/i);
    await searchInput.fill('avengers');
    await searchInput.press('Enter');

    await expect(page).toHaveURL(/\/search\?q=avengers/);
    await expect(page.locator('[data-testid="movie-card"]').first()).toBeVisible({ timeout: 10000 });

    const movieCards = page.locator('[data-testid="movie-card"]');
    const count = await movieCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show empty state for no results', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/buscar filmes/i);
    await searchInput.fill('xyzabc123nonexistent');
    await searchInput.press('Enter');

    await expect(page.getByText(/nenhum resultado/i)).toBeVisible({ timeout: 10000 });
  });

  test('should clear search and return to home', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/buscar filmes/i);
    await searchInput.fill('batman');
    await searchInput.press('Enter');
    await expect(page).toHaveURL(/\/search\?q=batman/);

    await page.getByRole('link', { name: /home/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('should navigate to movie details from search results', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/buscar filmes/i);
    await searchInput.fill('spider');
    await searchInput.press('Enter');

    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });
    await page.locator('[data-testid="movie-card"]').first().click();
    await expect(page).toHaveURL(/\/movie\/\d+/);
  });
});
