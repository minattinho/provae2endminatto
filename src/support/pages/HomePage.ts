import { Locator, Page } from '@playwright/test';

export default class HomePage {
  readonly searchInput: Locator;

  constructor(readonly page: Page) {
    this.searchInput = page.getByRole('textbox', {
      name: 'busque aqui seu produto'
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }
}
