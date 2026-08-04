import { APIRequestContext } from '@playwright/test';
import { Entities } from '../helpers/entities';

export class Products extends Entities {
    readonly productId = 5;
    readonly invalidProductId = 999999;
    readonly limit = 5;
    readonly skip = 5;
    readonly searchValue = 'phone';

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
} 