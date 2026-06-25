import { test, expect } from '@playwright/test'
import { captureConsoleErrors } from './helpers/errors'

/**
 * Wait for the React app to mount. `app-root` is the always-present shell hook;
 * the home header carries `app-navigation` (there's no longer a global top bar
 * on every page).
 */
async function waitForApp(page: import('@playwright/test').Page) {
  await page.waitForSelector('[data-testid="app-root"]', { timeout: 15000 })
}

test.describe('Smoke tests', () => {
  test('app loads without JS errors', async ({ page }) => {
    const errors = captureConsoleErrors(page)
    await page.goto('/')
    await waitForApp(page)
    expect(errors).toEqual([])
  })

  test('navigation is visible', async ({ page }) => {
    await page.goto('/')
    await waitForApp(page)
    await expect(page.getByTestId('app-navigation')).toBeVisible()
  })

  test('sign-in button visible when logged out', async ({ page }) => {
    await page.goto('/')
    await waitForApp(page)
    await expect(page.getByTestId('nav-sign-in-button')).toBeVisible()
    await expect(page.getByTestId('nav-user-name')).toHaveCount(0)
  })

  test('unknown route shows 404', async ({ page }) => {
    await page.goto('/nonexistent-page-xyz')
    await waitForApp(page)
    await expect(page.locator('text=404')).toBeVisible()
  })

  test('home shows the real app hero, not the scaffold placeholder', async ({ page }) => {
    await page.goto('/')
    await waitForApp(page)
    await expect(
      page.getByRole('heading', { name: /Practice the interview before it counts/i }),
    ).toBeVisible()
    // Scaffold placeholders must be gone.
    await expect(page.locator('text=Your DeepSpace app is running')).toHaveCount(0)
    await expect(page.locator('text=Get started')).toHaveCount(0)
    await expect(page).toHaveTitle(/Dialogue/i)
  })

  test('signed-out visitor sees the how-it-works preview', async ({ page }) => {
    await page.goto('/')
    await waitForApp(page)
    await expect(page.getByText('Pick your role')).toBeVisible()
    await expect(page.getByText('Get your report')).toBeVisible()
  })
})
