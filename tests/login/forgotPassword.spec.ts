import { expect, test } from '@playwright/test';
import { loginTestData } from '../../fixtures/testData';
import { LoginPage } from '../../pages/LoginPage';

test('navigates to the password reset flow', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLogin();
  await loginPage.continueWithEmail(loginTestData.unregisteredEmail);
  await loginPage.clickForgotPassword();
  await expect(loginPage.resetPasswordHeading).toBeVisible();
});
