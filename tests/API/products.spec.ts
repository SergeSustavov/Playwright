import { expect, test } from '@playwright/test';
import { Products } from './endpoints/productsEndpoint';

const products = new Products();

test.describe('Products API', () => {
    test.describe('GET /products', () => {
        test('returns a list of products', async ({ request }) => {
            const response = await products.getAllProducts(request);
            const responseBody = await response.json();
            expect(responseBody.products).toEqual(expect.any(Array));
        });

        test('returns a product by id', async ({ request }) => {
            const response = await products.getProductById(request, products.productId);
            const responseBody = await response.json();
            expect(responseBody.id).toBe(products.productId);
        });

        test('returns 404 for a missing product', async ({ request }) => {
            const response = await products.getProductById(request, products.invalidProductId);
            expect(response.status()).toBe(404);
        });

        test('returns a limited number of products', async ({ request }) => {
            const response = await products.getProductsWithPagination(request, products.limit, products.skip);
            const responseBody = await response.json();
            expect(responseBody.products.length).toBe(products.limit);
        });

        test('returns a product list for a search query', async ({ request }) => {
            const response = await products.searchProducts(request, products.searchValue);
            const responseBody = await response.json();
            expect(responseBody.products.length).toBeGreaterThan(0);
        });
    });

    test.describe('MODIFY /products', () => {
        test('create product', async ({ request }) => {
            const response = await products.addProduct(request, products.createProductPayload);
            const responseBody = await response.json();
            expect(responseBody.title).toBe(products.createProductPayload.title);
        });

        test('updates product', async ({ request }) => {
            const response = await products.updateProduct(request, products.productId, products.updateProductPayload);
            const responseBody = await response.json();
            expect(responseBody.title).toBe(products.updateProductPayload.title);
        });

        test('deletes product', async ({ request }) => {
            const response = await products.deleteProduct(request, products.productId);
            const responseBody = await response.json();
            expect(responseBody.isDeleted).toBe(true);
        });
    });
});