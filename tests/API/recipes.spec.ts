import { expect, test } from '@playwright/test';
import { Recipes } from './endpoints/recipesEndpoint';
import { recipesTestData } from './testData/recipes.data';

const recipes = new Recipes();

test.describe('Recipes API', () => {
    test.describe('GET /recipes', () => {
        test('returns a list of recipes', async ({ request }) => {
            const response = await recipes.getAllRecipes(request, {
                limit: recipesTestData.limit,
                skip: recipesTestData.skip,
            });
            const responseBody = await response.json();
            expect(responseBody.recipes).toEqual(expect.any(Array));
        });

        test('returns a recipe by id', async ({ request }) => {
            const response = await recipes.getRecipeById(request, recipesTestData.recipeId);
            const responseBody = await response.json();
            expect(responseBody.id).toBe(recipesTestData.recipeId);
        });

        test('returns 404 for a missing recipe', async ({ request }) => {
            const response = await recipes.getRecipeById(request, recipesTestData.invalidRecipeId);
            expect(response.status()).toBe(404);
        });

        test('returns a limited number of recipes', async ({ request }) => {
            const response = await recipes.getRecipesWithPagination(request, recipesTestData.limit, recipesTestData.skip);
            const responseBody = await response.json();
            expect(responseBody.recipes.length).toBe(recipesTestData.limit);
        });

        test('returns a recipe list for a search query', async ({ request }) => {
            const response = await recipes.searchRecipes(request, recipesTestData.searchValue);
            const responseBody = await response.json();
            expect(responseBody.recipes.length).toBeGreaterThan(0);
        });
    });

    test.describe('MODIFY /recipes', () => {
        test('create recipe', async ({ request }) => {
            const response = await recipes.addRecipe(request, recipesTestData.createRecipePayload);
            const responseBody = await response.json();
            expect(responseBody.name).toBe(recipesTestData.createRecipePayload.name);
        });

        test('updates recipe', async ({ request }) => {
            const response = await recipes.updateRecipe(request, recipesTestData.recipeId, recipesTestData.updateRecipePayload);
            const responseBody = await response.json();
            expect(responseBody.name).toBe(recipesTestData.updateRecipePayload.name);
        });

        test('deletes recipe', async ({ request }) => {
            const response = await recipes.deleteRecipe(request, recipesTestData.recipeId);
            const responseBody = await response.json();
            expect(responseBody.isDeleted).toBe(true);
        });
    });
});
