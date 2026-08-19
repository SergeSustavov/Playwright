import { APIRequestContext, APIResponse } from '@playwright/test';
import { Entities } from '../helpers/entities';

export class Books extends Entities {
    readonly isbn = '9781449325862';

    async addBook(request: APIRequestContext, userID: string, isbn: string): Promise<APIResponse> {
        return await request.post(this.books, {
            data: {
                userId: userID,
                collectionOfIsbns: [
                    {
                        isbn,
                    },
                ],
            }
        });
    }

    async deleteBook(request: APIRequestContext, userID: string, isbn: string): Promise<APIResponse> {
        return await request.delete(this.book, {
            data: {
                isbn,
                userId: userID,
            }
        })
    }
}