
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Пароль');
    this.submitButton = page.getByRole('button', { name: 'Увійти' });
  }

  async login(email: string, pwd: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pwd);
    await this.submitButton.click();
  }
}
