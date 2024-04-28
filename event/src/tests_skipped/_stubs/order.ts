export const order = {
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
