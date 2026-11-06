import { expect, test } from '@playwright/test';
import { messages } from '../../constants/messages';
import { loginTestData } from '../../fixtures/testData';
import { LoginPage } from '../../pages/LoginPage';
import { getLoginCredentials, hasLoginCredentials } from '../../utils/env';

test.describe('Hudl login validation', () => {
  test('shows an authentication error for an invalid password', async ({
    page,
  }) => {
    test.skip(
      !hasLoginCredentials(),
      'Set HUDL_EMAIL and HUDL_PASSWORD to run this test.',
    );
    const { email } = getLoginCredentials();
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.continueWithEmail(email);
    await loginPage.passwordInput.fill(loginTestData.invalidPassword);
    await loginPage.continueButton.click();

    await expect(page.getByText(messages.invalidCredentials)).toBeVisible();
    await expect(loginPage.loginHeading).toBeVisible();
  });

  test('rejects an invalid email format', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.emailInput.fill(loginTestData.invalidEmail);
    await loginPage.continueButton.click();
    await expect(loginPage.emailInput).toHaveAttribute('type', 'email');
    await expect(page.getByText(messages.invalidEmail)).toBeVisible();
    await expect(loginPage.passwordInput).toBeHidden();
  });

  test('keeps the email step open when email credential is empty', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.continueButton.click();

    await expect(loginPage.emailInput).toHaveAttribute('type', 'email');
    await expect(page.getByText(messages.requiredEmail)).toBeVisible();
    await expect(loginPage.passwordInput).toBeHidden();
  });

  test('requires a password before submitting', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.continueWithEmail(loginTestData.unregisteredEmail);
    await loginPage.continueButton.click();

    await expect(loginPage.passwordInput).toHaveAttribute('required', '');
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('requires an email address', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();

    await expect(loginPage.emailInput).toHaveAttribute('required', '');
    await loginPage.continueButton.click();
    await expect(loginPage.passwordInput).toBeHidden();
  });
});
