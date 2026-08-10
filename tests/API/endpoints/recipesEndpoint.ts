import { APIRequestContext } from '@playwright/test';
import { Entities } from '../helpers/entities';

export class Recipes extends Entities {
    readonly recipeId = 1;
    readonly invalidRecipeId = 999999;
    readonly limit = 5;
    readonly skip = 0;
    readonly searchValue = 'pizza';

    readonly createRecipePayload = {
        name: 'Full Send Downhill/Enduro MTB Recipe',
        description: 'A high-speed recipe combining gravity, suspension and poor financial decisions lol',
        prepTimeMinutes: 10,
        cookTimeMinutes: 20,
        servings: 1,
        difficulty: 'Extreme',
        cuisine: 'Gravity',
        mealType: ['Lunch'],
        ingredients: [
            '1 freeride bike',
            '1 full-face helmet',
            '1 set of knee pads',
            '1 set of back protection',
            '1 pair of gloves',
            '1 pair of goggles',
            '170 (or higher) mm of suspension',
            '4 piston brakes',
            '1 chairlift',
            '100% gravity',
            'zero unnecessary braking',
        ],
        instructions: [
            'Step 1: Load the bike onto the chairlift',
            'Step 2: Reconsider every decision that led to buying a downhill bike',
            'Step 3: Reach the top',
            'Step 4: Drop in',
            'Step 5: Brake late',
            'Step 6: Brake even later',
            'Step 7: Hit the rock garden and let the suspension earn its salary',
            'Step 8: Find a jump',
            'Step 9: Send the jump',
            'Step 10: Land slightly sideways but pretend it was intentional',
            'Step 11: Enter the next corner with more speed than talent',
            'Step 12: Somehow make the corner',
            'Step 13: Cross the finish line with a huge grin',
            'Step 14: Immediately queue for another run',
        ],
        tags: ['MTB', 'downhill', 'gravity', 'full-send', 'bike-park'],
    };

    readonly updateRecipePayload = {
        name: 'Survive an Enduro Descent',
        description: 'Recipe for turning elevation, rocks and questionable decisions into one very fast descent',
    };

    async getAllRecipes(request: APIRequestContext) {
        return request.get(this.recipes, {
            params: {
                limit: this.limit,
                skip: this.skip,
            },
        });
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
