import { test, expect } from '@playwright/test';

test('kezdolap_test', async ({ page }) => {
  await page.goto('http://localhost:4000/');
  await expect(page.getByRole('img', { name: 'Logo' }).first()).toBeVisible();

  // Check visibility of the first 5 images and their corresponding rounded divs
  await expect(page.getByRole('img').nth(5)).toBeVisible();
  await expect(page.locator('div:nth-child(5) > .rounded-5').first()).toBeVisible();
  await expect(page.locator('div:nth-child(6) > .rounded-5').first()).toBeVisible();
  await expect(page.locator('div:nth-child(7) > .rounded-5').first()).toBeVisible();
  await page.getByRole('button', { name: '›' }).first().click();
  await expect(page.locator('div:nth-child(8) > .rounded-5').first()).toBeVisible();
  await page.getByRole('button', { name: '›' }).first().click();
  await expect(page.locator('div:nth-child(9) > .rounded-5').first()).toBeVisible();
  await page.getByRole('button', { name: '›' }).first().click();
  await expect(page.locator('div:nth-child(10) > .rounded-5').first()).toBeVisible();
  await page.getByRole('button', { name: '›' }).first().click();
  await expect(page.locator('div:nth-child(11) > .rounded-5').first()).toBeVisible();

  // Check visibility of the second carousel images and their corresponding rounded divs
  await expect(page.locator('#carouselTrack2 > div:nth-child(4) > .rounded-5')).toBeVisible();
  await expect(page.locator('#carouselTrack2 > div:nth-child(5) > .rounded-5')).toBeVisible();
  await expect(page.locator('#carouselTrack2 > div:nth-child(6) > .rounded-5')).toBeVisible();
  await expect(page.locator('#carouselTrack2 > div:nth-child(7) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(1).click();
  await expect(page.locator('#carouselTrack2 > div:nth-child(8) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(1).click();
  await expect(page.locator('#carouselTrack2 > div:nth-child(9) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(1).click();
  await expect(page.locator('#carouselTrack2 > div:nth-child(10) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(1).click();
  await expect(page.locator('#carouselTrack2 > div:nth-child(11) > .rounded-5')).toBeVisible();

  // Check visibility of the third carousel images and their corresponding rounded divs
  await expect(page.locator('#carouselTrack3 > div:nth-child(4) > .rounded-5')).toBeVisible();
  await expect(page.locator('#carouselTrack3 > div:nth-child(5) > .rounded-5')).toBeVisible();
  await expect(page.locator('#carouselTrack3 > div:nth-child(6) > .rounded-5')).toBeVisible();
  await expect(page.locator('#carouselTrack3 > div:nth-child(7) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(2).click();
  await expect(page.locator('#carouselTrack3 > div:nth-child(8) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(2).click();
  await expect(page.locator('#carouselTrack3 > div:nth-child(9) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(2).click();
  await expect(page.locator('#carouselTrack3 > div:nth-child(10) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(2).click();
  await expect(page.locator('#carouselTrack3 > div:nth-child(11) > .rounded-5')).toBeVisible();

  // Check visibility of the fourth carousel images and their corresponding rounded divs
  await expect(page.locator('#carouselTrack4 > div:nth-child(4) > .rounded-5')).toBeVisible();
  await expect(page.locator('#carouselTrack4 > div:nth-child(5) > .rounded-5')).toBeVisible();
  await expect(page.locator('#carouselTrack4 > div:nth-child(6) > .rounded-5')).toBeVisible();
  await expect(page.locator('#carouselTrack4 > div:nth-child(7) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(3).click();
  await expect(page.locator('#carouselTrack4 > div:nth-child(8) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(3).click();
  await expect(page.locator('#carouselTrack4 > div:nth-child(9) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(3).click();
  await expect(page.locator('#carouselTrack4 > div:nth-child(10) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(3).click();
  await expect(page.locator('#carouselTrack4 > div:nth-child(11) > .rounded-5')).toBeVisible();

  // Check visibility of the fifth carousel images and their corresponding rounded divs
  await expect(page.locator('#carouselTrack5 > div:nth-child(4) > .rounded-5')).toBeVisible();
  await expect(page.locator('#carouselTrack5 > div:nth-child(5) > .rounded-5')).toBeVisible();
  await expect(page.locator('#carouselTrack5 > div:nth-child(6) > .rounded-5')).toBeVisible();
  await expect(page.locator('#carouselTrack5 > div:nth-child(7) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(4).click();
  await expect(page.locator('#carouselTrack5 > div:nth-child(8) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(4).click();
  await expect(page.locator('#carouselTrack5 > div:nth-child(9) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(4).click();
  await expect(page.locator('#carouselTrack5 > div:nth-child(10) > .rounded-5')).toBeVisible();
  await page.getByRole('button', { name: '›' }).nth(4).click();
  await expect(page.locator('#carouselTrack5 > div:nth-child(11) > .rounded-5')).toBeVisible();
  
});