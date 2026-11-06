import { expect, type Locator, type Page } from '@playwright/test';
import { logger } from '../utils/logger';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly loginHeading: Locator;
  readonly resetPasswordHeading: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByRole('textbox', { name: /email/i });
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.continueButton = page.getByRole('button', {
      name: 'Continue',
      exact: true,
    });
    this.forgotPasswordLink = page.getByRole('link', {
      name: /forgot password/i,
    });
    this.loginHeading = page.getByRole('heading', {
      name: 'Log In',
      exact: true,
    });
    this.resetPasswordHeading = page.getByRole('heading', {
      name: 'Reset Password',
      exact: true,
    });
  }

  async navigateToLogin(): Promise<void> {
    logger.info('Navigating to the Hudl login page.');
    await this.page.goto('/login');
    await expect(this.loginHeading).toBeVisible();
  }

  async continueWithEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.continueButton.click();
    await expect(this.passwordInput).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.navigateToLogin();
    await this.continueWithEmail(email);
    await this.passwordInput.fill(password);
    logger.info('Submitting login credentials.');
    await this.continueButton.click();
  }

  async clickForgotPassword(): Promise<void> {
    logger.info('Opening the password reset flow.');
    await this.forgotPasswordLink.click();
  }

  async getErrorMessage(): Promise<string | null> {
    const errorMessage = this.page.getByText(
      /incorrect username or password|unable to log in|invalid email|enter a valid email/i,
    );
    if (!(await errorMessage.isVisible())) {
      return null;
    }

    return errorMessage.textContent();
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return this.loginHeading.isVisible();
  }
}
