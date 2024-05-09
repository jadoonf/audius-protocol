import { expect } from '@playwright/test'

import { test as setup } from './test'
import { getUser } from './data'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  const user = getUser()
  const base64Entropy = btoa(user.entropy)
  await page.goto(`/feed?login=${base64Entropy}`)
  await expect(page.getByText('Your Feed')).toBeVisible({ timeout: 15000 })
  await page.evaluate(() => {
    localStorage.setItem('HAS_REQUESTED_BROWSER_PUSH_PERMISSION', 'true')
  })
  await page.context().storageState({ path: authFile })
})
