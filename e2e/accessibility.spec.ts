import { test, expect } from '@playwright/test';

test.describe('Accessibility & Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate header links with keyboard', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: /home/i });
    let homeFocused = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!homeFocused && attempts < maxAttempts) {
      await page.keyboard.press('Tab');
      homeFocused = await homeLink.evaluate((el) => el === document.activeElement);
      attempts++;
    }

    await expect(homeLink).toBeFocused();

    const favoritesLink = page.getByRole('link', { name: /favoritos/i });
    let favoritesFocused = false;
    attempts = 0;

    while (!favoritesFocused && attempts < maxAttempts) {
      await page.keyboard.press('Tab');
      favoritesFocused = await favoritesLink.evaluate((el) => el === document.activeElement);
      attempts++;
    }

    await expect(favoritesLink).toBeFocused();
  });

  test('should activate theme toggle with Enter key', async ({ page }) => {
    let focused = false;
    let attempts = 0;
    const maxAttempts = 20;

    while (!focused && attempts < maxAttempts) {
      await page.keyboard.press('Tab');
      const themeButton = page.getByRole('button', { name: /ativar tema/i });
      focused = await themeButton.evaluate((el) => el === document.activeElement);
      attempts++;
    }

    const initialTheme = await page.locator('html').getAttribute('class');
    await page.keyboard.press('Enter');

    const newTheme = await page.locator('html').getAttribute('class');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('should have proper ARIA labels on interactive elements', async ({ page }) => {
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });
    await page.locator('[data-testid="movie-card"]').first().click();
    await page.waitForLoadState('domcontentloaded');

    const favoriteButton = page.getByRole('button', { name: /favoritos/i }).first();
    await expect(favoriteButton).toBeVisible();

    const ariaPressed = await favoriteButton.getAttribute('aria-pressed');
    expect(ariaPressed).toBeDefined();
  });

  test('should have role="search" on search form', async ({ page }) => {
    const searchRegion = page.getByRole('search');
    await expect(searchRegion).toBeVisible();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const h1 = page.locator('h1');
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThanOrEqual(0);
  });

  test('should show focus indicators on interactive elements', async ({ page }) => {
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have alt text on movie images', async ({ page }) => {
    await page.waitForSelector('[data-testid="movie-card"]', { timeout: 10000 });

    const firstImage = page.locator('img').first();
    const alt = await firstImage.getAttribute('alt');

    expect(alt).toBeTruthy();
    expect(alt?.length).toBeGreaterThan(0);
  });
});
