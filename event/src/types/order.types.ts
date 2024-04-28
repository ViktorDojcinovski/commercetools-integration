import { UpdateAction } from '@commercetools/sdk-client-v2';

type Price = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

type User = {
  typeId: string;
  id: string;
};

type Client = {
  isPlatformClient: boolean;
  user: User;
};

type TaxedPrice = {
  totalNet: Price;
  totalGross: Price;
  taxPortions: any[];
  totalTax: Price;
};

type TaxRate = {
  name: string;
  amount: number;
  includedInPrice: boolean;
  country: string;
  state: string;
  id: string;
  key: string;
  subRates: any[];
};

type ShippingInfo = {
  shippingMethodName: string;
  price: Price;
  shippingRate: any;
  taxRate: TaxRate;
  taxCategory: User;
  deliveries: any[];
  shippingMethod: User;
  taxedPrice: {
    totalNet: any;
    totalGross: any;
    totalTax: any;
  };
  shippingMethodState: string;
};

type Address = {
  id: string;
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  mobile: string;
};

export type LocalizedString = {
  'en-GB': string;
};

export type LineItem = {
  id: string;
  productId: string;
  productKey: string;
  name: Record<string, string>;
  description: string;
  productType: {
    typeId: string;
    id: string;
    version: number;
  };
  variant: {
    id: number;
    sku: string;
    key: string;
    prices: {
      id: string;
      value: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
      };
      country: string;
      discounted: {
        value: {
          type: string;
          currencyCode: string;
          centAmount: number;
          fractionDigits: number;
        };
        discount: {
          typeId: string;
          id: string;
        };
      }[];
    }[];
    images: {
      url: string;
      dimensions: {
        w: number;
        h: number;
      };
    }[];
    attributes: {
      name: string;
      value:
        | boolean
        | Record<string, string>
        | { key: string; label: Record<string, string> };
    }[];
    assets: any[];
    availability: {
      channels: Record<
        string,
        {
          isOnStock: boolean;
          availableQuantity: number;
          version: number;
          id: string;
        }
      >;
    };
  };
  price: {
    id: string;
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    country: string;
    discounted: {
      value: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
      };
      discount: {
        typeId: string;
        id: string;
      };
    };
  };
  quantity: number;
  discountedPricePerQuantity: any[];
  taxRate: TaxRate;
  perMethodTaxRate: any[];
  addedAt: string;
  lastModifiedAt: string;
  state: any[];
  priceMode: string;
  lineItemMode: string;
  totalPrice: Price;
  taxedPrice: TaxedPrice;
  taxedPricePortions: any[];
};

export type Order = {
  type: string;
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: Client;
  createdBy: Client;
  customerId: string;
  customerEmail: string;
  totalPrice: Price;
  taxedPrice: TaxedPrice;
  country: string;
  taxedShippingPrice: TaxedPrice;
  orderState: string;
  syncInfo: any[];
  returnInfo: any[];
  taxMode: string;
  inventoryMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  origin: string;
  shippingMode: string;
  shippingInfo: ShippingInfo;
  shippingAddress: Address;
  shipping: any[];
  lineItems: LineItem[];
  customLineItems: any[];
  transactionFee: boolean;
  discountCodes: any[];
  directDiscounts: any[];
  cart: any;
  billingAddress: Address;
  itemShippingAddresses: any[];
  refusedGifts: any[];
  store: any;
};

export type OrderControllerResponse = {
  statusCode: number;
  message?: string;
  actions?: UpdateAction[];
};

export type Message = {
  typeId: string;
  obj: Order;
};

export type RequestBody = {
  message: Message;
  action: string;
};
