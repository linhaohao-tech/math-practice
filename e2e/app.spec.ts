import { expect, test } from '@playwright/test'

async function deselectAllOperations(page: import('@playwright/test').Page) {
  for (const label of ['Add', 'Subtract', 'Multiply', 'Divide']) {
    await page.getByRole('button', { name: new RegExp(label, 'i') }).click()
  }
}

async function answerCurrentCard(
  page: import('@playwright/test').Page,
  assessment: 'correct' | 'incorrect',
) {
  await page.locator('.flashcard-front button[type="button"]').first().click()
  await expect(page.locator('.flashcard-back')).toBeVisible()

  const buttonName =
    assessment === 'correct' ? /I Got It Right/i : /I Got It Wrong/i
  await page.getByRole('button', { name: buttonName }).click()

  // Wait for flip-back animation and state update before continuing.
  await page.waitForTimeout(700)
}

test.describe('Math Flashcard App', () => {
  test('loads the home screen', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Math Adventure!' })).toBeVisible()
    await expect(page.getByRole('button', { name: /Start Practicing/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Review Mistakes/i })).toBeDisabled()
    await expect(page.getByRole('button', { name: /My Stats/i })).toBeVisible()
  })

  test('shows validation when no operations are selected', async ({ page }) => {
    await page.goto('/')
    await deselectAllOperations(page)

    await page.getByRole('button', { name: /Start Practicing/i }).click()

    await expect(
      page.getByText(/Pick at least one operation before you start/i),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Math Adventure!' })).toBeVisible()
  })

  test('practices a flashcard and updates session stats', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: '10' }).click()
    await page.getByRole('button', { name: /Start Practicing/i }).click()

    await expect(page.getByRole('heading', { name: 'Practice Time!' })).toBeVisible()
    await expect(page.getByText(/Progress/i)).toBeVisible()

    await answerCurrentCard(page, 'correct')

    await expect(page.getByText(/2 \/ 10/)).toBeVisible()

    await page.getByRole('button', { name: /Back Home/i }).click()
    await page.getByRole('button', { name: /Go Home/i }).click()

    await page.getByRole('button', { name: /My Stats/i }).click()
    await expect(page.getByRole('heading', { name: 'Session Report' })).toBeVisible()
    await expect(
      page.locator('section').filter({ hasText: 'Total Attempted' }),
    ).toContainText('1')
  })

  test('enables review mode after marking a question wrong', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: '10' }).click()
    await page.getByRole('button', { name: /Start Practicing/i }).click()
    await answerCurrentCard(page, 'incorrect')
    await expect(page.getByText(/2 \/ 10/)).toBeVisible()

    await page.getByRole('button', { name: /Back Home/i }).click()
    await page.getByRole('button', { name: /Go Home/i }).click()

    const reviewButton = page.getByRole('button', { name: /Review Mistakes/i })
    await expect(reviewButton).toBeEnabled()

    await reviewButton.click()

    await expect(page.getByRole('heading', { name: 'Try Again Zone' })).toBeVisible()
    await expect(page.getByText(/Review progress/i)).toBeVisible()
  })
})
