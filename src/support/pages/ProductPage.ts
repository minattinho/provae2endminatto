import { Locator, Page } from '@playwright/test';

export default class ProductPage {
  readonly title: Locator;
  readonly buyButton: Locator;

  constructor(readonly page: Page) {
    this.title = page.getByRole('heading', { level: 1 });
    this.buyButton = page.getByRole('button', { name: 'Comprar', exact: true });
  }
}
