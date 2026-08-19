import { APIRequestContext, APIResponse } from '@playwright/test';
import { Entities } from '../helpers/entities';
import { randomInt } from 'crypto';

export class User extends Entities {
    readonly userName = 'BooksLover';
    readonly password = 'howToStoreYourPass101!';

    async createNewUser(request: APIRequestContext): Promise<APIResponse> {
        return await request.post(this.user, {
            data: {
                userName: await this.getUniqueUserName(),
                password: this.password,
            },
        });
    }

    async authorizeWithNewUser(request: APIRequestContext, userName: string, password: string) {
        return await request.post(this.auth, {
            data: {
                userName: userName,
                password: password
            }
        });
    }

    async getUniqueUserName(): Promise<string> {
        return `${this.userName}-${randomInt(100000)}`;
    }

    async deleteUser(request: APIRequestContext, userId: string): Promise<APIResponse> {
        return await request.delete(this.user + `${userId}`);
    }
}