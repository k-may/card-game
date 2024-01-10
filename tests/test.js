import { expect, test } from '@playwright/test';

test('Index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading')).toBeVisible();
});

test('Index page has 4 players', async ({ page }) => {
	await page.goto('/');

	await page.waitForSelector(".player");
	const players = await page.locator('.player').count();
	await expect(players).toBe(4);
});


test('Each player has 5 cards', async ({ page }) => {
	await page.goto('/');

	await page.waitForSelector(".player");
	const cards = await page.$$('.player .card-deck .card');
	await expect(cards.length).toBe(20);
});


test('Index page has start button', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('button.start')).toBeVisible()
});
