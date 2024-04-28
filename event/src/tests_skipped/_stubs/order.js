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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLEtBQUssR0FBRztJQUNuQixJQUFJLEVBQUUsT0FBTztJQUNiLEVBQUUsRUFBRSxzQ0FBc0M7SUFDMUMsT0FBTyxFQUFFLENBQUM7SUFDVixpQkFBaUIsRUFBRSwwQkFBMEI7SUFDN0MseUJBQXlCLEVBQUUsQ0FBQztJQUM1QixTQUFTLEVBQUUsMEJBQTBCO0lBQ3JDLGNBQWMsRUFBRSwwQkFBMEI7SUFDMUMsY0FBYyxFQUFFO1FBQ2QsZ0JBQWdCLEVBQUUsSUFBSTtRQUN0QixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxzQ0FBc0MsRUFBRTtLQUNyRTtJQUNELFNBQVMsRUFBRTtRQUNULGdCQUFnQixFQUFFLElBQUk7UUFDdEIsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsc0NBQXNDLEVBQUU7S0FDckU7SUFDRCxVQUFVLEVBQUUsc0NBQXNDO0lBQ2xELGFBQWEsRUFBRSxpQkFBaUI7SUFDaEMsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLGVBQWU7UUFDckIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsVUFBVSxFQUFFLEtBQUs7UUFDakIsY0FBYyxFQUFFLENBQUM7S0FDbEI7SUFDRCxVQUFVLEVBQUU7UUFDVixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsZUFBZTtZQUNyQixZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsS0FBSztZQUNqQixjQUFjLEVBQUUsQ0FBQztTQUNsQjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxlQUFlO1lBQ3JCLFlBQVksRUFBRSxLQUFLO1lBQ25CLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLGNBQWMsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsV0FBVyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsZUFBZTtZQUNyQixZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsSUFBSTtZQUNoQixjQUFjLEVBQUUsQ0FBQztTQUNsQjtLQUNGO0lBQ0QsT0FBTyxFQUFFLElBQUk7SUFDYixrQkFBa0IsRUFBRTtRQUNsQixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsZUFBZTtZQUNyQixZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsSUFBSTtZQUNoQixjQUFjLEVBQUUsQ0FBQztTQUNsQjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxlQUFlO1lBQ3JCLFlBQVksRUFBRSxLQUFLO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGNBQWMsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsV0FBVyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsZUFBZTtZQUNyQixZQUFZLEVBQUUsS0FBSztZQUNuQixVQUFVLEVBQUUsR0FBRztZQUNmLGNBQWMsRUFBRSxDQUFDO1NBQ2xCO0tBQ0Y7SUFDRCxVQUFVLEVBQUUsTUFBTTtJQUNsQixRQUFRLEVBQUUsRUFBRTtJQUNaLFVBQVUsRUFBRSxFQUFFO0lBQ2QsT0FBTyxFQUFFLFVBQVU7SUFDbkIsYUFBYSxFQUFFLE1BQU07SUFDckIsZUFBZSxFQUFFLFVBQVU7SUFDM0Isa0JBQWtCLEVBQUUsZUFBZTtJQUNuQyxNQUFNLEVBQUUsVUFBVTtJQUNsQixZQUFZLEVBQUUsUUFBUTtJQUN0QixZQUFZLEVBQUU7UUFDWixrQkFBa0IsRUFBRSxhQUFhO1FBQ2pDLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxlQUFlO1lBQ3JCLFlBQVksRUFBRSxLQUFLO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGNBQWMsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtRQUNqRSxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUscUJBQXFCO1lBQzNCLE1BQU0sRUFBRSxJQUFJO1lBQ1osZUFBZSxFQUFFLEtBQUs7WUFDdEIsT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUUsVUFBVTtZQUNqQixFQUFFLEVBQUUsVUFBVTtZQUNkLEdBQUcsRUFBRSxjQUFjO1lBQ25CLFFBQVEsRUFBRSxFQUFFO1NBQ2I7UUFDRCxXQUFXLEVBQUU7WUFDWCxNQUFNLEVBQUUsY0FBYztZQUN0QixFQUFFLEVBQUUsc0NBQXNDO1NBQzNDO1FBQ0QsVUFBVSxFQUFFLEVBQUU7UUFDZCxjQUFjLEVBQUU7WUFDZCxNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLEVBQUUsRUFBRSxzQ0FBc0M7U0FDM0M7UUFDRCxVQUFVLEVBQUU7WUFDVixRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDbEIsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ3BCLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNuQjtRQUNELG1CQUFtQixFQUFFLGFBQWE7S0FDbkM7SUFDRCxlQUFlLEVBQUU7UUFDZixFQUFFLEVBQUUsVUFBVTtRQUNkLFNBQVMsRUFBRSxVQUFVO1FBQ3JCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFVBQVUsRUFBRSxlQUFlO1FBQzNCLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFVBQVUsRUFBRSxPQUFPO1FBQ25CLElBQUksRUFBRSxlQUFlO1FBQ3JCLEtBQUssRUFBRSxVQUFVO1FBQ2pCLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxRQUFRLEVBQUUsRUFBRTtJQUNaLFNBQVMsRUFBRTtRQUNUO1lBQ0UsRUFBRSxFQUFFLHNDQUFzQztZQUMxQyxTQUFTLEVBQUUsc0NBQXNDO1lBQ2pELFVBQVUsRUFBRSxxQkFBcUI7WUFDakMsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxxQkFBcUI7Z0JBQzlCLE9BQU8sRUFBRSxxQkFBcUI7Z0JBQzlCLE9BQU8sRUFBRSxxQkFBcUI7YUFDL0I7WUFDRCxXQUFXLEVBQUU7Z0JBQ1gsTUFBTSxFQUFFLGNBQWM7Z0JBQ3RCLEVBQUUsRUFBRSxzQ0FBc0M7Z0JBQzFDLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsRUFBRSxFQUFFLENBQUM7Z0JBQ0wsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsR0FBRyxFQUFFLFVBQVU7Z0JBQ2YsTUFBTSxFQUFFO29CQUNOO3dCQUNFLEVBQUUsRUFBRSxzQ0FBc0M7d0JBQzFDLEtBQUssRUFBRTs0QkFDTCxJQUFJLEVBQUUsZUFBZTs0QkFDckIsWUFBWSxFQUFFLEtBQUs7NEJBQ25CLFVBQVUsRUFBRSxLQUFLOzRCQUNqQixjQUFjLEVBQUUsQ0FBQzt5QkFDbEI7d0JBQ0QsT0FBTyxFQUFFLElBQUk7d0JBQ2IsVUFBVSxFQUFFOzRCQUNWLEtBQUssRUFBRTtnQ0FDTCxJQUFJLEVBQUUsZUFBZTtnQ0FDckIsWUFBWSxFQUFFLEtBQUs7Z0NBQ25CLFVBQVUsRUFBRSxLQUFLO2dDQUNqQixjQUFjLEVBQUUsQ0FBQzs2QkFDbEI7NEJBQ0QsUUFBUSxFQUFFO2dDQUNSLE1BQU0sRUFBRSxrQkFBa0I7Z0NBQzFCLEVBQUUsRUFBRSxzQ0FBc0M7NkJBQzNDO3lCQUNGO3FCQUNGO29CQUNEO3dCQUNFLEVBQUUsRUFBRSxzQ0FBc0M7d0JBQzFDLEtBQUssRUFBRTs0QkFDTCxJQUFJLEVBQUUsZUFBZTs0QkFDckIsWUFBWSxFQUFFLEtBQUs7NEJBQ25CLFVBQVUsRUFBRSxLQUFLOzRCQUNqQixjQUFjLEVBQUUsQ0FBQzt5QkFDbEI7d0JBQ0QsT0FBTyxFQUFFLElBQUk7d0JBQ2IsVUFBVSxFQUFFOzRCQUNWLEtBQUssRUFBRTtnQ0FDTCxJQUFJLEVBQUUsZUFBZTtnQ0FDckIsWUFBWSxFQUFFLEtBQUs7Z0NBQ25CLFVBQVUsRUFBRSxLQUFLO2dDQUNqQixjQUFjLEVBQUUsQ0FBQzs2QkFDbEI7NEJBQ0QsUUFBUSxFQUFFO2dDQUNSLE1BQU0sRUFBRSxrQkFBa0I7Z0NBQzFCLEVBQUUsRUFBRSxzQ0FBc0M7NkJBQzNDO3lCQUNGO3FCQUNGO29CQUNEO3dCQUNFLEVBQUUsRUFBRSxzQ0FBc0M7d0JBQzFDLEtBQUssRUFBRTs0QkFDTCxJQUFJLEVBQUUsZUFBZTs0QkFDckIsWUFBWSxFQUFFLEtBQUs7NEJBQ25CLFVBQVUsRUFBRSxLQUFLOzRCQUNqQixjQUFjLEVBQUUsQ0FBQzt5QkFDbEI7d0JBQ0QsT0FBTyxFQUFFLElBQUk7d0JBQ2IsVUFBVSxFQUFFOzRCQUNWLEtBQUssRUFBRTtnQ0FDTCxJQUFJLEVBQUUsZUFBZTtnQ0FDckIsWUFBWSxFQUFFLEtBQUs7Z0NBQ25CLFVBQVUsRUFBRSxLQUFLO2dDQUNqQixjQUFjLEVBQUUsQ0FBQzs2QkFDbEI7NEJBQ0QsUUFBUSxFQUFFO2dDQUNSLE1BQU0sRUFBRSxrQkFBa0I7Z0NBQzFCLEVBQUUsRUFBRSxzQ0FBc0M7NkJBQzNDO3lCQUNGO3FCQUNGO2lCQUNGO2dCQUNELE1BQU0sRUFBRTtvQkFDTjt3QkFDRSxHQUFHLEVBQUUsMEdBQTBHO3dCQUMvRyxVQUFVLEVBQUU7NEJBQ1YsQ0FBQyxFQUFFLElBQUk7NEJBQ1AsQ0FBQyxFQUFFLElBQUk7eUJBQ1I7cUJBQ0Y7b0JBQ0Q7d0JBQ0UsR0FBRyxFQUFFLDBHQUEwRzt3QkFDL0csVUFBVSxFQUFFOzRCQUNWLENBQUMsRUFBRSxJQUFJOzRCQUNQLENBQUMsRUFBRSxJQUFJO3lCQUNSO3FCQUNGO2lCQUNGO2dCQUNELFVBQVUsRUFBRTtvQkFDVjt3QkFDRSxJQUFJLEVBQUUsY0FBYzt3QkFDcEIsS0FBSyxFQUFFOzRCQUNMLEdBQUcsRUFBRSxTQUFTOzRCQUNkLEtBQUssRUFBRTtnQ0FDTCxPQUFPLEVBQUUsU0FBUztnQ0FDbEIsT0FBTyxFQUFFLEtBQUs7Z0NBQ2QsT0FBTyxFQUFFLEtBQUs7NkJBQ2Y7eUJBQ0Y7cUJBQ0Y7b0JBQ0Q7d0JBQ0UsSUFBSSxFQUFFLGFBQWE7d0JBQ25CLEtBQUssRUFBRSxJQUFJO3FCQUNaO29CQUNEO3dCQUNFLElBQUksRUFBRSxhQUFhO3dCQUNuQixLQUFLLEVBQUU7NEJBQ0wsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsT0FBTyxFQUFFLE9BQU87NEJBQ2hCLE9BQU8sRUFBRSxLQUFLO3lCQUNmO3FCQUNGO29CQUNEO3dCQUNFLElBQUksRUFBRSxZQUFZO3dCQUNsQixLQUFLLEVBQUU7NEJBQ0wsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLE9BQU8sRUFBRSxLQUFLO3lCQUNmO3FCQUNGO29CQUNEO3dCQUNFLElBQUksRUFBRSxPQUFPO3dCQUNiLEtBQUssRUFBRTs0QkFDTCxPQUFPLEVBQUUsU0FBUzs0QkFDbEIsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLE9BQU8sRUFBRSxTQUFTO3lCQUNuQjtxQkFDRjtvQkFDRDt3QkFDRSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxLQUFLLEVBQUU7NEJBQ0wsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLE9BQU8sRUFBRSxTQUFTOzRCQUNsQixPQUFPLEVBQUUsU0FBUzt5QkFDbkI7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFO29CQUNaLFFBQVEsRUFBRTt3QkFDUixzQ0FBc0MsRUFBRTs0QkFDdEMsU0FBUyxFQUFFLElBQUk7NEJBQ2YsaUJBQWlCLEVBQUUsRUFBRTs0QkFDckIsT0FBTyxFQUFFLENBQUM7NEJBQ1YsRUFBRSxFQUFFLHNDQUFzQzt5QkFDM0M7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUNELEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsc0NBQXNDO2dCQUMxQyxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFlBQVksRUFBRSxLQUFLO29CQUNuQixVQUFVLEVBQUUsS0FBSztvQkFDakIsY0FBYyxFQUFFLENBQUM7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRSxJQUFJO2dCQUNiLFVBQVUsRUFBRTtvQkFDVixLQUFLLEVBQUU7d0JBQ0wsSUFBSSxFQUFFLGVBQWU7d0JBQ3JCLFlBQVksRUFBRSxLQUFLO3dCQUNuQixVQUFVLEVBQUUsS0FBSzt3QkFDakIsY0FBYyxFQUFFLENBQUM7cUJBQ2xCO29CQUNELFFBQVEsRUFBRTt3QkFDUixNQUFNLEVBQUUsa0JBQWtCO3dCQUMxQixFQUFFLEVBQUUsc0NBQXNDO3FCQUMzQztpQkFDRjthQUNGO1lBQ0QsUUFBUSxFQUFFLENBQUM7WUFDWCwwQkFBMEIsRUFBRSxFQUFFO1lBQzlCLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUscUJBQXFCO2dCQUMzQixNQUFNLEVBQUUsSUFBSTtnQkFDWixlQUFlLEVBQUUsS0FBSztnQkFDdEIsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLEVBQUUsRUFBRSxVQUFVO2dCQUNkLEdBQUcsRUFBRSxjQUFjO2dCQUNuQixRQUFRLEVBQUUsRUFBRTthQUNiO1lBQ0QsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixPQUFPLEVBQUUsMEJBQTBCO1lBQ25DLGNBQWMsRUFBRSwwQkFBMEI7WUFDMUMsS0FBSyxFQUFFO2dCQUNMO29CQUNFLFFBQVEsRUFBRSxDQUFDO29CQUNYLEtBQUssRUFBRTt3QkFDTCxNQUFNLEVBQUUsT0FBTzt3QkFDZixFQUFFLEVBQUUsc0NBQXNDO3FCQUMzQztpQkFDRjthQUNGO1lBQ0QsU0FBUyxFQUFFLFVBQVU7WUFDckIsWUFBWSxFQUFFLFVBQVU7WUFDeEIsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxlQUFlO2dCQUNyQixZQUFZLEVBQUUsS0FBSztnQkFDbkIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLGNBQWMsRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsZUFBZTtvQkFDckIsWUFBWSxFQUFFLEtBQUs7b0JBQ25CLFVBQVUsRUFBRSxLQUFLO29CQUNqQixjQUFjLEVBQUUsQ0FBQztpQkFDbEI7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxlQUFlO29CQUNyQixZQUFZLEVBQUUsS0FBSztvQkFDbkIsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLGNBQWMsRUFBRSxDQUFDO2lCQUNsQjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFlBQVksRUFBRSxLQUFLO29CQUNuQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsY0FBYyxFQUFFLENBQUM7aUJBQ2xCO2FBQ0Y7WUFDRCxrQkFBa0IsRUFBRSxFQUFFO1NBQ3ZCO0tBQ0Y7SUFDRCxlQUFlLEVBQUUsRUFBRTtJQUNuQixjQUFjLEVBQUUsSUFBSTtJQUNwQixhQUFhLEVBQUUsRUFBRTtJQUNqQixlQUFlLEVBQUUsRUFBRTtJQUNuQixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxzQ0FBc0MsRUFBRTtJQUNwRSxjQUFjLEVBQUU7UUFDZCxFQUFFLEVBQUUsVUFBVTtRQUNkLFNBQVMsRUFBRSxVQUFVO1FBQ3JCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFVBQVUsRUFBRSxlQUFlO1FBQzNCLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFVBQVUsRUFBRSxPQUFPO1FBQ25CLElBQUksRUFBRSxlQUFlO1FBQ3JCLEtBQUssRUFBRSxVQUFVO1FBQ2pCLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxxQkFBcUIsRUFBRSxFQUFFO0lBQ3pCLFlBQVksRUFBRSxFQUFFO0lBQ2hCLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFO0NBQ2xELENBQUMifQ==