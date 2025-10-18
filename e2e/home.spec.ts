import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load home page and display movies', async ({ page }) => {
    await expect(page.locator('[data-testid="movie-card"]').first()).toBeVisible({ timeout: 10000 });

    const movieCards = page.locator('[data-testid="movie-card"]');
    const count = await movieCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display header with navigation', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /favoritos/i })).toBeVisible();
  });

  test('should have search bar', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/buscar filmes/i);
    await expect(searchInput).toBeVisible();
  });

  test('should navigate to movie details when clicking a movie', async ({ page }) => {
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });
    await page.locator('[data-testid="movie-card"]').first().click();
    await expect(page).toHaveURL(/\/movie\/\d+/);
  });
});
