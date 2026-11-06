import { expect, test } from '@playwright/test';
import { loginTestData } from '../../fixtures/testData';
import { LoginPage } from '../../pages/LoginPage';

test('navigates to the password reset flow', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLogin();
  await loginPage.continueWithEmail(loginTestData.unregisteredEmail);
  await loginPage.clickForgotPassword();

  await expect(page).toHaveURL(/\/u\/reset-password\/request\//);
  await expect(loginPage.resetPasswordHeading).toBeVisible();
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'skipped') {
    return;
  }

  await testInfo.attach('validation-screenshot', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});
