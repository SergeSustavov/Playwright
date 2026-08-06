import { APIRequestContext } from '@playwright/test';
import { Entities } from '../helpers/entities';

export class Cart extends Entities {
    readonly cartId = 1;
    readonly invalidCartId = 999999;
    readonly userId = 5;
    readonly limit = 5;
    readonly skip = 0;

    readonly createCartPayload = {
        userId: 5,
        products: [
            { id: 1, quantity: 1 },
            { id: 2, quantity: 2 },
        ],
    };

    readonly updateCartPayload = {
        merge: true,
        products: [
            { id: 1, quantity: 3 },
        ],
    };

    async getAllCarts(request: APIRequestContext) {
        return request.get(this.carts, {
            params: {
                limit: this.limit,
                skip: this.skip,
            },
        });
    }

    async getCartById(request: APIRequestContext, cartId: number) {
        return request.get(`${this.carts}/${cartId}`);
    }

    async getCartByUserId(request: APIRequestContext, userId: number) {
        return request.get(`${this.carts}/user/${userId}`);
    }

    async addCart(request: APIRequestContext, data: Record<string, unknown>) {
        return request.post(`${this.carts}/add`, {
            data,
        });
    }

    async updateCart(request: APIRequestContext, cartId: number, data: Record<string, unknown>) {
        return request.put(`${this.carts}/${cartId}`, {
            data,
        });
    }

    async deleteCart(request: APIRequestContext, cartId: number) {
        return request.delete(`${this.carts}/${cartId}`);
    }
}