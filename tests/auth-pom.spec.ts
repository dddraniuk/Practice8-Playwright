
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Тестування авторизації за допомогою POM', () => {

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

  test('успішна авторизація через Page Object', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('user@example.com', 'password123');

    await expect(page).toHaveURL('/dashboard');
  });

  test('помилка при неправильних даних через Page Object', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('wrong@test.com', 'wrongpassword');

    await expect(
      page.getByText('Невірний email або пароль')
    ).toBeVisible();
  });

});
