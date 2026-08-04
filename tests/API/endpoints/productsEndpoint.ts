import { APIRequestContext } from '@playwright/test';
import { Entities } from '../helpers/entities';

export class Products extends Entities {
    readonly productId = 5;
    readonly invalidProductId = 999999;
    readonly limit = 5;
    readonly skip = 5;
    readonly searchValue = 'phone';

    readonly createProductPayload = {
        title: 'New Product',
        description: 'Created from Playwright API test',
        price: 123,
        category: 'electronics',
    };

    readonly updateProductPayload = {
        title: 'Updated Product',
        price: 321,
    };

    async getAllProducts(request: APIRequestContext) {
        return request.get(this.products);
    }

    async getProductById(request: APIRequestContext, productId: number) {
        return request.get(`${this.products}/${productId}`);
    }

    async getProductsWithPagination(request: APIRequestContext, limit: number, skip: number) {
        return request.get(this.products, {
            params: {
                limit,
                skip,
            },
        });
    }

    async searchProducts(request: APIRequestContext, query: string) {
        return request.get(`${this.products}/search`, {
            params: {
                q: query,
            },
        });
    }

    async addProduct(request: APIRequestContext, data: Record<string, unknown>) {
        return request.post(`${this.products}/add`, {
            data,
        });
    }

    async updateProduct(request: APIRequestContext, productId: number, data: Record<string, unknown>) {
        return request.put(`${this.products}/${productId}`, {
            data,
        });
    }

    async deleteProduct(request: APIRequestContext, productId: number) {
        return request.delete(`${this.products}/${productId}`);
    }
} 