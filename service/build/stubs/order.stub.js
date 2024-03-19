"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = void 0;
exports.order = {
    type: 'Order',
    id: 'ab0e52ce-0238-45ad-966b-b525fc0cd555',
    version: 1,
    versionModifiedAt: '2024-02-20T12:47:39.516Z',
    lastMessageSequenceNumber: 1,
    createdAt: '2024-02-20T12:47:39.497Z',
    lastModifiedAt: '2024-02-20T12:47:39.497Z',
    lastModifiedBy: {
        isPlatformClient: true,
        user: { typeId: 'user', id: '1b385ffd-5163-494a-978c-c643a585894c' },
    },
    createdBy: {
        isPlatformClient: true,
        user: { typeId: 'user', id: '1b385ffd-5163-494a-978c-c643a585894c' },
    },
    customerId: '0a74d2ab-46b0-4f94-bed6-a8101f1d8ad0',
    customerEmail: 'jen@example.com',
    totalPrice: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 38915,
        fractionDigits: 2,
    },
    taxedPrice: {
        totalNet: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 38915,
            fractionDigits: 2,
        },
        totalGross: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 40472,
            fractionDigits: 2,
        },
        taxPortions: [[Object]],
        totalTax: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 1557,
            fractionDigits: 2,
        },
    },
    country: 'US',
    taxedShippingPrice: {
        totalNet: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 5000,
            fractionDigits: 2,
        },
        totalGross: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 5200,
            fractionDigits: 2,
        },
        taxPortions: [[Object]],
        totalTax: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 200,
            fractionDigits: 2,
        },
    },
    orderState: 'Open',
    syncInfo: [],
    returnInfo: [],
    taxMode: 'Platform',
    inventoryMode: 'None',
    taxRoundingMode: 'HalfEven',
    taxCalculationMode: 'LineItemLevel',
    origin: 'Merchant',
    shippingMode: 'Single',
    shippingInfo: {
        shippingMethodName: 'US Delivery',
        price: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 5000,
            fractionDigits: 2,
        },
        shippingRate: { price: [Object], freeAbove: [Object], tiers: [] },
        taxRate: {
            name: 'State Tax: New York',
            amount: 0.04,
            includedInPrice: false,
            country: 'US',
            state: 'New York',
            id: 'HPfXmVcE',
            key: 'ny-state-tax',
            subRates: [],
        },
        taxCategory: {
            typeId: 'tax-category',
            id: 'eba19b16-279d-402f-9488-61c7c12e755f',
        },
        deliveries: [],
        shippingMethod: {
            typeId: 'shipping-method',
            id: '2fb78c72-d5a2-4126-8a9b-353eac838c16',
        },
        taxedPrice: {
            totalNet: [Object],
            totalGross: [Object],
            totalTax: [Object],
        },
        shippingMethodState: 'MatchesCart',
    },
    shippingAddress: {
        id: '5uYYz6d4',
        firstName: 'Jennifer',
        lastName: 'Robinson',
        streetName: 'Second Street',
        streetNumber: '15',
        postalCode: '10001',
        city: 'New York City',
        state: 'New York',
        country: 'US',
    },
    shipping: [],
    lineItems: [
        {
            id: '4fa42689-d3b5-4aa6-ba0f-68815cc0c62a',
            productId: '3f25a3e5-d1d9-432e-92de-1b1984406f18',
            productKey: 'leather-weave-chair',
            name: {
                'en-US': 'Leather Weave Chair',
                'en-GB': 'Leather Weave Chair',
                'de-DE': 'Ledergeflecht Stuhl',
            },
            productType: {
                typeId: 'product-type',
                id: 'ea76d31d-8bc9-48e6-916a-1d6775c74365',
                version: 1,
            },
            variant: {
                id: 1,
                sku: 'BA-092',
                key: 'BA-092-1',
                prices: [
                    {
                        id: 'a1f93259-4f48-4b53-a2fb-9a2ba5417ac7',
                        value: {
                            type: 'centPrecision',
                            currencyCode: 'EUR',
                            centAmount: 39900,
                            fractionDigits: 2,
                        },
                        country: 'DE',
                        discounted: {
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'EUR',
                                centAmount: 33915,
                                fractionDigits: 2,
                            },
                            discount: {
                                typeId: 'product-discount',
                                id: '250297cb-9729-4f87-9110-dfd663916bbd',
                            },
                        },
                    },
                    {
                        id: 'e5a41091-3b26-4fb9-83b7-1f842d57ad02',
                        value: {
                            type: 'centPrecision',
                            currencyCode: 'GBP',
                            centAmount: 34900,
                            fractionDigits: 2,
                        },
                        country: 'GB',
                        discounted: {
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'GBP',
                                centAmount: 29665,
                                fractionDigits: 2,
                            },
                            discount: {
                                typeId: 'product-discount',
                                id: '250297cb-9729-4f87-9110-dfd663916bbd',
                            },
                        },
                    },
                    {
                        id: 'be6b83ad-f71a-415b-9b70-aa235f872390',
                        value: {
                            type: 'centPrecision',
                            currencyCode: 'USD',
                            centAmount: 39900,
                            fractionDigits: 2,
                        },
                        country: 'US',
                        discounted: {
                            value: {
                                type: 'centPrecision',
                                currencyCode: 'USD',
                                centAmount: 33915,
                                fractionDigits: 2,
                            },
                            discount: {
                                typeId: 'product-discount',
                                id: '250297cb-9729-4f87-9110-dfd663916bbd',
                            },
                        },
                    },
                ],
                images: [
                    {
                        url: 'https://storage.googleapis.com/merchant-center-europe/sample-data/goodstore/Leather_Weave_Chair-1.1.jpeg',
                        dimensions: {
                            w: 5500,
                            h: 4400,
                        },
                    },
                    {
                        url: 'https://storage.googleapis.com/merchant-center-europe/sample-data/goodstore/Leather_Weave_Chair-1.2.jpeg',
                        dimensions: {
                            w: 3375,
                            h: 4500,
                        },
                    },
                ],
                attributes: [
                    {
                        name: 'color-filter',
                        value: {
                            key: '#D2B48C',
                            label: {
                                'de-DE': 'Bräunen',
                                'en-GB': 'Tan',
                                'en-US': 'Tan',
                            },
                        },
                    },
                    {
                        name: 'new-arrival',
                        value: true,
                    },
                    {
                        name: 'finishlabel',
                        value: {
                            'en-GB': 'Oak',
                            'de-DE': 'Eiche',
                            'en-US': 'Oak',
                        },
                    },
                    {
                        name: 'colorlabel',
                        value: {
                            'en-GB': 'Tan',
                            'de-DE': 'Bräunen',
                            'en-US': 'Tan',
                        },
                    },
                    {
                        name: 'color',
                        value: {
                            'en-GB': '#BC5724',
                            'de-DE': '#BC5724',
                            'en-US': '#BC5724',
                        },
                    },
                    {
                        name: 'finish',
                        value: {
                            'en-GB': '#E3AF81',
                            'de-DE': '#E3AF81',
                            'en-US': '#E3AF81',
                        },
                    },
                ],
                assets: [],
                availability: {
                    channels: {
                        'e88384a3-d3d7-4199-aa63-1275c40e322c': {
                            isOnStock: true,
                            availableQuantity: 98,
                            version: 2,
                            id: '3332e4d3-49f4-42fe-a961-8a2230bf7bcc',
                        },
                    },
                },
            },
            price: {
                id: 'be6b83ad-f71a-415b-9b70-aa235f872390',
                value: {
                    type: 'centPrecision',
                    currencyCode: 'USD',
                    centAmount: 39900,
                    fractionDigits: 2,
                },
                country: 'US',
                discounted: {
                    value: {
                        type: 'centPrecision',
                        currencyCode: 'USD',
                        centAmount: 33915,
                        fractionDigits: 2,
                    },
                    discount: {
                        typeId: 'product-discount',
                        id: '250297cb-9729-4f87-9110-dfd663916bbd',
                    },
                },
            },
            quantity: 1,
            discountedPricePerQuantity: [],
            taxRate: {
                name: 'State Tax: New York',
                amount: 0.04,
                includedInPrice: false,
                country: 'US',
                state: 'New York',
                id: 'HPfXmVcE',
                key: 'ny-state-tax',
                subRates: [],
            },
            perMethodTaxRate: [],
            addedAt: '2024-02-20T12:47:27.551Z',
            lastModifiedAt: '2024-02-20T12:47:27.551Z',
            state: [
                {
                    quantity: 1,
                    state: {
                        typeId: 'state',
                        id: '96f198f1-ef36-431a-9a61-c498c0942039',
                    },
                },
            ],
            priceMode: 'Platform',
            lineItemMode: 'Standard',
            totalPrice: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 33915,
                fractionDigits: 2,
            },
            taxedPrice: {
                totalNet: {
                    type: 'centPrecision',
                    currencyCode: 'USD',
                    centAmount: 33915,
                    fractionDigits: 2,
                },
                totalGross: {
                    type: 'centPrecision',
                    currencyCode: 'USD',
                    centAmount: 35272,
                    fractionDigits: 2,
                },
                totalTax: {
                    type: 'centPrecision',
                    currencyCode: 'USD',
                    centAmount: 1357,
                    fractionDigits: 2,
                },
            },
            taxedPricePortions: [],
        },
    ],
    customLineItems: [],
    transactionFee: true,
    discountCodes: [],
    directDiscounts: [],
    cart: { typeId: 'cart', id: 'dce44fc0-7b2e-4607-8687-4929a9efd6a3' },
    billingAddress: {
        id: '5uYYz6d4',
        firstName: 'Jennifer',
        lastName: 'Robinson',
        streetName: 'Second Street',
        streetNumber: '15',
        postalCode: '10001',
        city: 'New York City',
        state: 'New York',
        country: 'US',
    },
    itemShippingAddresses: [],
    refusedGifts: [],
    store: { typeId: 'store', key: 'the-good-store' },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuc3R1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHVicy9vcmRlci5zdHViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsS0FBSyxHQUFHO0lBQ25CLElBQUksRUFBRSxPQUFPO0lBQ2IsRUFBRSxFQUFFLHNDQUFzQztJQUMxQyxPQUFPLEVBQUUsQ0FBQztJQUNWLGlCQUFpQixFQUFFLDBCQUEwQjtJQUM3Qyx5QkFBeUIsRUFBRSxDQUFDO0lBQzVCLFNBQVMsRUFBRSwwQkFBMEI7SUFDckMsY0FBYyxFQUFFLDBCQUEwQjtJQUMxQyxjQUFjLEVBQUU7UUFDZCxnQkFBZ0IsRUFBRSxJQUFJO1FBQ3RCLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLHNDQUFzQyxFQUFFO0tBQ3JFO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsZ0JBQWdCLEVBQUUsSUFBSTtRQUN0QixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxzQ0FBc0MsRUFBRTtLQUNyRTtJQUNELFVBQVUsRUFBRSxzQ0FBc0M7SUFDbEQsYUFBYSxFQUFFLGlCQUFpQjtJQUNoQyxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsZUFBZTtRQUNyQixZQUFZLEVBQUUsS0FBSztRQUNuQixVQUFVLEVBQUUsS0FBSztRQUNqQixjQUFjLEVBQUUsQ0FBQztLQUNsQjtJQUNELFVBQVUsRUFBRTtRQUNWLFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxlQUFlO1lBQ3JCLFlBQVksRUFBRSxLQUFLO1lBQ25CLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLGNBQWMsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLGVBQWU7WUFDckIsWUFBWSxFQUFFLEtBQUs7WUFDbkIsVUFBVSxFQUFFLEtBQUs7WUFDakIsY0FBYyxFQUFFLENBQUM7U0FDbEI7UUFDRCxXQUFXLEVBQUUs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