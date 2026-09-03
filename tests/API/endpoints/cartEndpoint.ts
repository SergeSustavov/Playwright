import { APIRequestContext } from '@playwright/test';
import { Entities } from '../helpers/entities';

export class Cart extends Entities {

    async getAllCarts(request: APIRequestContext, params?: { limit?: number, skip?: number }) {
        return request.get(this.carts, { params });
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