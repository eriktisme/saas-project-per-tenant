import { test, expect } from '@playwright/test'

test('login page has title', async ({ page }) => {
  await page.goto('/login')

  await expect(page).toHaveTitle(/Login/)
})
