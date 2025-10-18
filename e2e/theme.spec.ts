import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should toggle between light and dark theme', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: /ativar tema/i });
    await expect(themeButton).toBeVisible();

    const initialTheme = await page.locator('html').getAttribute('class');
    await themeButton.click();

    const newTheme = await page.locator('html').getAttribute('class');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('should persist theme after page reload', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: /ativar tema/i });
    await themeButton.click();

    const themeBeforeReload = await page.locator('html').getAttribute('class');
    await page.reload();

    const themeAfterReload = await page.locator('html').getAttribute('class');
    expect(themeAfterReload).toBe(themeBeforeReload);
  });

  test('should update theme toggle button aria-label', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: /ativar tema escuro/i });
    await expect(themeButton).toBeVisible();
    await themeButton.click();

    await expect(page.getByRole('button', { name: /ativar tema claro/i })).toBeVisible();
  });

  test('should have aria-pressed attribute on theme button', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: /ativar tema/i });

    const ariaPressed = await themeButton.getAttribute('aria-pressed');
    expect(ariaPressed).toBeDefined();

    await themeButton.click();
    const newAriaPressed = await themeButton.getAttribute('aria-pressed');
    expect(newAriaPressed).not.toBe(ariaPressed);
  });
});
