
import { test, expect } from '@playwright/test';

test.describe('Форма авторизації', () => {

  test.beforeEach(async ({ page }) => {
    await page.route('**/api/auth/login', async route => {
      const data = route.request().postDataJSON();

      if (
        data.email === 'user@example.com' &&
        data.password === 'password123'
      ) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            token: 'mock-jwt-token',
            user: { id: 1, name: 'Тестовий Користувач' }
          }),
        });
      } else {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({
            message: 'Невірний email або пароль'
          }),
        });
      }
    });

    await page.goto('/login');
  });

  test('успішна авторизація', async ({ page }) => {
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Пароль').fill('password123');
    await page.getByRole('button', { name: 'Увійти' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('помилка при невірних даних', async ({ page }) => {
    await page.getByLabel('Email').fill('wrong@test.com');
    await page.getByLabel('Пароль').fill('wrongpassword');
    await page.getByRole('button').click();
    await expect(page.getByText('Невірний email або пароль'))
      .toBeVisible();
  });

});
