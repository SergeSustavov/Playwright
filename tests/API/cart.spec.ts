import { expect, test } from '@playwright/test';
import { Cart } from './endpoints/cartEndpoint';
import { cartTestData } from './testData/cart.data';

const cart = new Cart();

test.describe('Cart API', () => {
    test.describe('GET /carts', () => {
        test('returns a list of carts', async ({ request }) => {
            const response = await cart.getAllCarts(request, {
                limit: cartTestData.limit,
                skip: cartTestData.skip,
            });
            const responseBody = await response.json();
            expect(responseBody.carts).toEqual(expect.any(Array));
        });

        test('returns a cart by id', async ({ request }) => {
            const response = await cart.getCartById(request, cartTestData.cartId);
            const responseBody = await response.json();
            expect(responseBody.id).toBe(cartTestData.cartId);
        });

        test('returns a cart for a user', async ({ request }) => {
            const response = await cart.getCartByUserId(request, cartTestData.userId);
            const responseBody = await response.json();
            expect(responseBody.carts[0].userId).toBe(cartTestData.userId);
        });

        test('returns 404 for a missing cart', async ({ request }) => {
            const response = await cart.getCartById(request, cartTestData.invalidCartId);
            expect(response.status()).toBe(404);
        });
    });

    test.describe('MODIFY /carts', () => {
        test('creates a cart', async ({ request }) => {
            const response = await cart.addCart(request, cartTestData.createCartPayload);
            const responseBody = await response.json();
            expect(responseBody.userId).toBe(cartTestData.createCartPayload.userId);
        });

        test('updates a cart', async ({ request }) => {
            const response = await cart.updateCart(request, cartTestData.cartId, cartTestData.updateCartPayload);
            const responseBody = await response.json();
            expect(responseBody.id).toBe(cartTestData.cartId);
        });

        test('deletes a cart', async ({ request }) => {
            const response = await cart.deleteCart(request, cartTestData.cartId);
            const responseBody = await response.json();
            expect(responseBody.isDeleted).toBe(true);
        });
    });
});