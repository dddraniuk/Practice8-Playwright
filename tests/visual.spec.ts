
import { test, expect } from '@playwright/test';

test.describe('Візуальне тестування', () => {

  test('перевірка зовнішнього вигляду сторінки авторизації', async ({ page }) => {
    await page.goto('/login');

    await expect(page).toHaveScreenshot('login-page.png');
  });

});
