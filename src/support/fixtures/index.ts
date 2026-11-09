import { test as base } from '@playwright/test';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import SearchResultsPage from '../pages/SearchResultsPage';

type Pages = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  productPage: ProductPage;
};

export const test = base.extend<Pages>({
  page: async ({ page }, use) => {
    // Pop-ups que surgem em momentos imprevisíveis e cobrem a página
    await page.addLocatorHandler(
      page.getByRole('button', { name: 'Fechar banner de cookies' }),
      closeButton => closeButton.click()
    );
    await page.addLocatorHandler(
      page
        .getByRole('dialog', {
          name: 'Promotional Wheel of Fortune Game Pop-up'
        })
        .getByRole('button', { name: 'Close' }),
      closeButton => closeButton.click()
    );
    await use(page);
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  }
});

export { expect } from '@playwright/test';
