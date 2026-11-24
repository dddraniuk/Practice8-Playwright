
import { test, expect } from '@playwright/test';

test('перехоплення API-запиту авторизації', async ({ page }) => {

  await page.route('**/api/auth/login', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        token: 'mock-jwt-token',
        user: { id: 1, name: 'Тестовий Користувач' }
      }),
    });
  });

  await page.goto('/login');

  const [response] = await Promise.all([
    page.waitForResponse('**/api/auth/login'),
    (async () => {
      await page.getByLabel('Email').fill('user@example.com');
      await page.getByLabel('Пароль').fill('password123');
      await page.getByRole('button').click();
    })(),
  ]);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.token).toBe('mock-jwt-token');
});
