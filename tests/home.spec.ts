import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

let home: HomePage;

test.describe('main page tests', () => {
    test.beforeEach(async ({ page }) => {
      const home = new HomePage(page));
      await home.goto('https://github.com/SergeSustavov');
    });

    test(`go to author page from the carousel`, async ({ page }) => {
        await home.carouselAuthor.click();
      });
});
