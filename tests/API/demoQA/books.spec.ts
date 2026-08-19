import { expect } from '@playwright/test';
import { test } from './helpers/fixtures';
import { Books } from './endpoints/booksEndpoint';

const books = new Books();
test.describe('User Books API', () => {
    test('add book to the user', async ({ authenticatedRequest }) => {
        const { request, userID } = authenticatedRequest;
        const response = await books.addBook(request, userID, books.isbn);
        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.books[0].isbn).toEqual(books.isbn);
    })

    test('@negative add book as unauthorized user', async ({ request }) => {
        const userID = 'someUserID';
        const response = await books.addBook(request, userID, books.isbn);
        const responseBody = await response.json();
        expect(responseBody.message).toEqual('User not authorized!');
    })

    test('delete book from the user', async ({ authenticatedRequest }) => {
        const { request, userID } = authenticatedRequest;
        const response = await books.addBook(request, userID, books.isbn);
        expect(response.status()).toBe(201);

        const deleteResponse = await books.deleteBook(request, userID, books.isbn);
        console.log(await deleteResponse.text())
        expect(deleteResponse.status()).toBe(204);
    })

    test('@negative delete unexisted book from the user', async ({ authenticatedRequest }) => {
        const { request, userID } = authenticatedRequest;
        const response = await books.addBook(request, userID, books.isbn);
        expect(response.status()).toBe(201);

        const deleteResponse = await books.deleteBook(request, userID, books.isbn + '133132');
        const deleteBodyRespnose = await deleteResponse.json();
        expect(deleteBodyRespnose.message).toContain('ISBN supplied is not available');
    })
});