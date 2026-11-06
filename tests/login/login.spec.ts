import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { getLoginCredentials, hasLoginCredentials } from '../../utils/env';

test.describe('Hudl login', () => {
  test('logs in with valid credentials', async ({ page }) => {
    test.skip(
      !hasLoginCredentials(),
      'Set HUDL_EMAIL and HUDL_PASSWORD to run this test.',
    );
    const { email, password } = getLoginCredentials();
    const loginPage = new LoginPage(page);

    await loginPage.login(email, password);

    await expect(page).toHaveTitle(/Hudl/i);
    await expect(page).toHaveURL(/https:\/\/www\.hudl\.com\/home\/?/);
    await expect(
      page.getByRole('link', { name: 'Hudl', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Newcastle Jets FC/ }),
    ).toBeVisible();
  });

  test('shows the login form controls', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.continueWithEmail('qa.automation@example.invalid');

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.continueButton).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });

  test('masks password characters', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.continueWithEmail('qa.automation@example.invalid');

    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });
});
