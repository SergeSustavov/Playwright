import { expect, test } from '@playwright/test';
import { Products } from './endpoints/productsEndpoint';

const products = new Products();
let responseBody: any;
let productId = 5;

test.describe('Products API', () => {

    test('should return a list of products', async ({ request }) => {
        const response = await request.get(products.products);
        expect(response.ok()).toBeTruthy();

        responseBody = await response.json();
        expect(responseBody.products).toBeInstanceOf(Array);
    });

    test('get product by ID', async ({ request }) => {
        const response = await request.get(products.products + `/${productId}`);
        responseBody = await response.json();
        expect(responseBody.id).toBe(productId);
    });
});