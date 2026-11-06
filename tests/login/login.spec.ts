import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { getLoginCredentials } from '../../utils/env';

test.describe('Hudl login', () => {
  test('logs in with valid credentials', async ({ page }) => {
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
});
