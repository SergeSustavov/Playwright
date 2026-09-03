import { APIRequestContext } from '@playwright/test';
import { Entities } from '../helpers/entities';

export class Recipes extends Entities {

    async getAllRecipes(request: APIRequestContext, params?: { limit?: number, skip?: number }) {
        return request.get(this.recipes, { params });
    }

    async getRecipeById(request: APIRequestContext, recipeId: number) {
        return request.get(`${this.recipes}/${recipeId}`);
    }

    async getRecipesWithPagination(request: APIRequestContext, limit: number, skip: number) {
        return request.get(this.recipes, {
            params: {
                limit,
                skip,
            },
        });
    }

    async searchRecipes(request: APIRequestContext, query: string) {
        return request.get(`${this.recipes}/search`, {
            params: {
                q: query,
            },
        });
    }

    async addRecipe(request: APIRequestContext, data: Record<string, unknown>) {
        return request.post(`${this.recipes}/add`, {
            data,
        });
    }

    async updateRecipe(request: APIRequestContext, recipeId: number, data: Record<string, unknown>) {
        return request.put(`${this.recipes}/${recipeId}`, {
            data,
        });
    }

    async deleteRecipe(request: APIRequestContext, recipeId: number) {
        return request.delete(`${this.recipes}/${recipeId}`);
    }
}
