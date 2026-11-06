import { expect, test } from '@playwright/test';
import { loginTestData } from '../../fixtures/testData';
import { LoginPage } from '../../pages/LoginPage';

test('navigates to the password reset flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const resetPasswordHeading = page.getByRole('heading', {
    name: 'Reset Password',
    exact: true,
  });

  await loginPage.navigateToLogin();
  await loginPage.continueWithEmail(loginTestData.unregisteredEmail);
  await loginPage.clickForgotPassword();

  await expect(page).toHaveURL(/\/u\/reset-password\/request\//);
  await expect(resetPasswordHeading).toBeVisible();
});
