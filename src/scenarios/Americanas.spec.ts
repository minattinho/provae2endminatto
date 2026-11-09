import { expect, test } from '../support/fixtures';

test.describe('Americanas - busca de produtos', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('deve buscar um produto e exibir resultados relacionados', async ({
    page,
    homePage,
    searchResultsPage
  }) => {
    await homePage.search('garrafa termica');

    await expect(page).toHaveURL(/garrafa-termica/);
    await expect(searchResultsPage.productCards.first()).toBeVisible();
    await expect(searchResultsPage.productNames.first()).toContainText(
      /garrafa/i
    );
  });

  test('deve abrir o detalhe do produto a partir da busca', async ({
    page,
    homePage,
    searchResultsPage,
    productPage
  }) => {
    await homePage.search('garrafa termica');
    const productName = await searchResultsPage.openFirstProduct();

    await expect(page).toHaveURL(/\/p(\?|$)/);
    await expect(productPage.title).toHaveText(productName);
    await expect(productPage.buyButton).toBeVisible();
  });

  test('deve informar quando a busca não encontra resultados', async ({
    page,
    homePage,
    searchResultsPage
  }) => {
    const term = 'xyzqwkjhgfdsa';
    await homePage.search(term);

    await expect(page).toHaveURL(new RegExp(`q=${term}`));
    await expect(searchResultsPage.emptyResultHeading(term)).toBeVisible();
    await expect(searchResultsPage.productCards).toHaveCount(0);
  });
});
