import { expect, test } from '@playwright/test';
import { User } from './endpoints/usersEndpoint';

const user = new User();
let userID: string | undefined;

test.describe('User API', () => {
    test.afterEach(async ({ request }) => {
        if (userID) await user.deleteUser(request, userID); // still can't delete user in case !userID
    });

    test('create new user', async ({ request }) => {
        const response = await user.createNewUser(request);
        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        userID = responseBody.userID;
        expect(responseBody).toEqual(expect.objectContaining({
            userID: expect.any(String),
            username: expect.any(String),
            books: expect.any(Array)
        }));
    });

    test('create new user w/o username', async ({ request }) => {
        const response = await request.post(user.user, {
            data: {
                userName: '',
                password: 'smth'
            }
        });
        const responseBody = await response.json();
        expect(responseBody.message).toEqual('UserName and Password required.');
    });

    test('create new user incorrect password', async ({ request }) => {
        const response = await request.post(user.user, {
            data: {
                userName: await user.getUniqueUserName(),
                password: 'smth'
            }
        });
        const responseBody = await response.json();
        expect(responseBody.message).toContain('Passwords must have at least');
    });
});