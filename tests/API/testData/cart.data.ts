export const cartTestData = {
    cartId: 1,
    invalidCartId: 999999,
    userId: 5,
    limit: 5,
    skip: 0,

    createCartPayload: {
        userId: 5,
        products: [
            { id: 1, quantity: 1 },
            { id: 2, quantity: 2 },
        ],
    },

    updateCartPayload: {
        merge: true,
        products: [
            { id: 1, quantity: 3 },
        ],
    }
}