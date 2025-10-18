import { test, expect } from '@playwright/test';

test.describe('Favorites Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should add movie to favorites and display in favorites page', async ({ page }) => {
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });
    await page.locator('[data-testid="movie-card"]').first().click();
    await expect(page).toHaveURL(/\/movie\/\d+/);
    await page.waitForLoadState('domcontentloaded');

    const favoriteButton = page.getByRole('button', { name: /adicionar.*favoritos/i }).first();
    await favoriteButton.click();
    await expect(page.getByRole('button', { name: /remover.*favoritos/i })).toBeVisible();

    await page.getByRole('link', { name: /favoritos/i }).click();
    await expect(page).toHaveURL('/favorites');
    await expect(page.locator('[data-testid="movie-card"]')).toHaveCount(1);
  });

  test('should remove movie from favorites', async ({ page }) => {
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });
    await page.locator('[data-testid="movie-card"]').first().click();
    await page.waitForLoadState('domcontentloaded');

    const favoriteButton = page.getByRole('button', { name: /adicionar.*favoritos/i }).first();
    await favoriteButton.click();

    await page.getByRole('link', { name: /favoritos/i }).click();
    await expect(page).toHaveURL('/favorites');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="movie-card"]').first().click();
    await page.waitForLoadState('domcontentloaded');

    const removeButton = page.getByRole('button', { name: /remover.*favoritos/i }).first();
    await removeButton.click();

    await page.getByRole('link', { name: /favoritos/i }).click();
    await expect(page.getByText(/nenhum/i)).toBeVisible({ timeout: 5000 });
  });

  test('should update favorites count badge in header', async ({ page }) => {
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });
    await page.locator('[data-testid="movie-card"]').first().click();
    await page.waitForLoadState('domcontentloaded');

    const favoriteButton = page.getByRole('button', { name: /adicionar.*favoritos/i }).first();
    await favoriteButton.click();

    await page.getByRole('link', { name: /home/i }).click();
    await expect(page.getByText('1').first()).toBeVisible();
  });

  test('should persist favorites after page reload', async ({ page }) => {
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });
    await page.locator('[data-testid="movie-card"]').first().click();
    await page.waitForLoadState('domcontentloaded');

    const favoriteButton = page.getByRole('button', { name: /adicionar.*favoritos/i }).first();
    await favoriteButton.click();

    await page.reload();
    await page.getByRole('link', { name: /favoritos/i }).click();
    await expect(page.locator('[data-testid="movie-card"]')).toHaveCount(1);
  });
});
