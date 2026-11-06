import { expect, test } from '@playwright/test';
import { messages } from '../../constants/messages';
import { loginTestData } from '../../fixtures/testData';
import { LoginPage } from '../../pages/LoginPage';
import { getLoginCredentials } from '../../utils/env';

test.describe('Hudl login validation with invalid credentials', () => {
  test('shows an error for an invalid password', async ({ page }) => {
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

  test('requires an email address when continuing with empty credentials', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();

    await expect(loginPage.emailInput).toHaveAttribute('required', '');
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
});
