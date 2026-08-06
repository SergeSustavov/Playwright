import { expect, test } from '@playwright/test';
import { Cart } from './endpoints/cartEndpoint';

const cart = new Cart();

test.describe('Cart API', () => {
    test.describe('GET /carts', () => {
        test('returns a list of carts', async ({ request }) => {
            const response = await cart.getAllCarts(request);
            const responseBody = await response.json();
            expect(responseBody.carts).toEqual(expect.any(Array));
        });

        test('returns a cart by id', async ({ request }) => {
            const response = await cart.getCartById(request, cart.cartId);
            const responseBody = await response.json();
            expect(responseBody.id).toBe(cart.cartId);
        });

        test('returns a cart for a user', async ({ request }) => {
            const response = await cart.getCartByUserId(request, cart.userId);
            const responseBody = await response.json();
            expect(responseBody.carts[0].userId).toBe(cart.userId);
        });

        test('returns 404 for a missing cart', async ({ request }) => {
            const response = await cart.getCartById(request, cart.invalidCartId);
            expect(response.status()).toBe(404);
        });
    });

    test.describe('MODIFY /carts', () => {
        test('creates a cart', async ({ request }) => {
            const response = await cart.addCart(request, cart.createCartPayload);
            const responseBody = await response.json();
            expect(responseBody.userId).toBe(cart.createCartPayload.userId);
        });

        test('updates a cart', async ({ request }) => {
            const response = await cart.updateCart(request, cart.cartId, cart.updateCartPayload);
            const responseBody = await response.json();
            expect(responseBody.id).toBe(cart.cartId);
        });

        test('deletes a cart', async ({ request }) => {
            const response = await cart.deleteCart(request, cart.cartId);
            const responseBody = await response.json();
            expect(responseBody.isDeleted).toBe(true);
        });
    });
});