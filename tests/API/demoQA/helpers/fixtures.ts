import { APIRequestContext, test as base, request as playwrightRequest } from '@playwright/test';
import { User } from '../endpoints/usersEndpoint';

type AuthenticatedUser = {
    request: APIRequestContext,
    userID: string
}

export const test = base.extend<{ authenticatedRequest: AuthenticatedUser }>({
    authenticatedRequest: async ({ request }, use) => {
        const user = new User();
        const responseUser = await user.createNewUser(request);
        if (!responseUser.ok()) {
            throw new Error('Can not create user');
        }
        const responseBodyUser = await responseUser.json();

        const userID = responseBodyUser.userID;
        const username = responseBodyUser.username;

        const responseToken = await user.authorizeWithNewUser(request, username, user.password);
        const responseBodyToken = await responseToken.json();

        const authenticatedRequest = await playwrightRequest.newContext({
            extraHTTPHeaders: {
                Authorization: `Bearer ${responseBodyToken.token}`
            }
        });
        await use({request: authenticatedRequest, userID});
        await authenticatedRequest.dispose();
    },
});