import { expect, test } from '@playwright/test';
import { Recipes } from './endpoints/recipesEndpoint';

const recipes = new Recipes();

test.describe('Recipes API', () => {
    test.describe('GET /recipes', () => {
        test('returns a list of recipes', async ({ request }) => {
            const response = await recipes.getAllRecipes(request);
            const responseBody = await response.json();
            expect(responseBody.recipes).toEqual(expect.any(Array));
        });

        test('returns a recipe by id', async ({ request }) => {
            const response = await recipes.getRecipeById(request, recipes.recipeId);
            const responseBody = await response.json();
            expect(responseBody.id).toBe(recipes.recipeId);
        });

        test('returns 404 for a missing recipe', async ({ request }) => {
            const response = await recipes.getRecipeById(request, recipes.invalidRecipeId);
            expect(response.status()).toBe(404);
        });

        test('returns a limited number of recipes', async ({ request }) => {
            const response = await recipes.getRecipesWithPagination(request, recipes.limit, recipes.skip);
            const responseBody = await response.json();
            expect(responseBody.recipes.length).toBe(recipes.limit);
        });

        test('returns a recipe list for a search query', async ({ request }) => {
            const response = await recipes.searchRecipes(request, recipes.searchValue);
            const responseBody = await response.json();
            expect(responseBody.recipes.length).toBeGreaterThan(0);
        });
    });

    test.describe('MODIFY /recipes', () => {
        test('create recipe', async ({ request }) => {
            const response = await recipes.addRecipe(request, recipes.createRecipePayload);
            const responseBody = await response.json();
            expect(responseBody.name).toBe(recipes.createRecipePayload.name);
        });

        test('updates recipe', async ({ request }) => {
            const response = await recipes.updateRecipe(request, recipes.recipeId, recipes.updateRecipePayload);
            const responseBody = await response.json();
            expect(responseBody.name).toBe(recipes.updateRecipePayload.name);
        });

        test('deletes recipe', async ({ request }) => {
            const response = await recipes.deleteRecipe(request, recipes.recipeId);
            const responseBody = await response.json();
            expect(responseBody.isDeleted).toBe(true);
        });
    });
});
