import { Locator, Page } from '@playwright/test';

export default class SearchResultsPage {
  readonly productCards: Locator;
  readonly productNames: Locator;

  constructor(readonly page: Page) {
    this.productCards = page
      .getByTestId('product-gallery')
      .getByRole('link')
      .filter({ has: page.getByRole('heading', { level: 3 }) });
    this.productNames = this.productCards.getByRole('heading', { level: 3 });
  }

  emptyResultHeading(term: string): Locator {
    return this.page.getByRole('heading', {
      level: 1,
      name: `nenhum resultado encontrado para ${term}`
    });
  }

  async openFirstProduct(): Promise<string> {
    const name = await this.productNames.first().innerText();
    await this.productCards.first().click();
    return name;
  }
}
