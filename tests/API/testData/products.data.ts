export const productsTestData = {
    productId: 5,
    invalidProductId: 999999,
    limit: 5,
    skip: 5,
    searchValue: 'phone',

    createProductPayload: {
        title: 'MTB Full Send Button',
        description:
            'Your friend said "No balls" but your kness are shaking? ' +
            'Get a completely unnecessary button that provides +15% confidence and -40% survival instinct',
        price: 69.69,
        category: 'cycling',
    },

    updateProductPayload: {
        title: 'MTB Full Send Button v2',
        price: 58.008,
    },
};