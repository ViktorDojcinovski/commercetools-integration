import { describe, expect, test, jest } from '@jest/globals';
import Axios from 'axios';

import { order } from '../_stubs/order';
import { resource } from '../_stubs/resource';
import { executeOrderProcess, mapOrder } from '../../utils/order.utils';
import { Order } from '../../types/order.types';
// import { refreshToken } from '../../utils/refreshToken.utils';
import { logger } from '../../utils/logger.utils';
import { refreshToken } from '../../utils/refreshToken.utils';

jest.mock('axios');
jest.mock('../../client/create.client');
jest.mock('../../utils/refreshToken.utils');
jest.mock('../../utils/config.utils', () => ({
  readConfiguration: jest.fn().mockReturnValue({
    clientId: 'mockClientId',
    clientSecret: 'mockClientSecret',
    projectKey: 'mockProjectKey',
    scope: 'mockScope',
    region: 'mockRegion',
    vsPassword: 'mockVsPassword',
    vsUsername: 'mockVsUsername',
    vsApi_v4: 'mockVsApi_v4',
    edgeApi_v4: 'mockEdgeApi_v4',
  }),
}));
jest.mock('../../utils/logger.utils', () => ({
  logger: {
    info: jest.fn(),
  },
}));

describe('executeOrderProcess util function', () => {
  test('should return with correct log when there is no message', async () => {
    const mockResponse = { data: {} };
    (Axios as jest.Mocked<typeof Axios>).post.mockResolvedValue(mockResponse);
    await executeOrderProcess(order as unknown as Order, resource, Axios);

    expect(logger.info).toHaveBeenCalledWith('Order processed succesfully');
  });
  test('should return with correct log when lineItems are missing channel property', async () => {
    const mockOrder = {
      ...order,
      lineItems: [
        {
          ...order.lineItems,
          variant: {
            ...order.lineItems[0].variant,
            availability: {},
          },
        },
      ],
    };

    await executeOrderProcess(mockOrder as unknown as Order, resource, Axios);
    expect(logger.info).toHaveBeenCalledWith(
      'One or more line items are missing channel(supplier)'
    );
  });

  test('should refresh token and update the client and return with correct log', async () => {
    const error401 = {
      response: {
        status: 401,
        data: {
          error: 'Failed to process the order.',
        },
      },
    };
    const updatedClient = {
      post: jest.fn(),
    };
    (Axios as jest.Mocked<typeof Axios>).post.mockRejectedValueOnce(error401);
    (
      refreshToken as jest.MockedFunction<typeof refreshToken>
    ).mockResolvedValueOnce(updatedClient as any);
    await executeOrderProcess(order as unknown as Order, resource, Axios);

    expect(refreshToken).toHaveBeenCalledTimes(1);
    expect(updatedClient.post).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('Order processed succesfully');
  });
  test('should return with correct log when unexpected error will occur', async () => {
    const error500 = {
      response: {
        status: 500,
        data: {
          error: 'Failed to process the order.',
        },
      },
    };
    (Axios as jest.Mocked<typeof Axios>).post.mockRejectedValueOnce(error500);
    (
      refreshToken as jest.MockedFunction<typeof refreshToken>
    ).mockResolvedValue(Axios);
    await executeOrderProcess(order as unknown as Order, resource, Axios);

    expect(logger.info).toHaveBeenCalledWith('Unexpected error occured.');
  });
  test('should return with correct log when unexpected error with incorrect structure will occur', async () => {
    const error = {
      response: undefined,
    };
    (Axios as jest.Mocked<typeof Axios>).post.mockRejectedValue(error);
    await executeOrderProcess(order as unknown as Order, resource, Axios);

    expect(logger.info).toHaveBeenCalledWith('Unexpected error occured.');
  });
});

describe('mapOrder util function', () => {
  test('should return mapped order object', () => {
    expect(
      mapOrder(
        order as unknown as Order,
        resource,
        `https://www.sandbox.the-edge.io/restapi/v4/suppliers/1569/`,
        [{ 'en-GB': 'test description' }]
      )
    ).toEqual({
      supplier: `https://www.sandbox.the-edge.io/restapi/v4/suppliers/1569/`,
      order_reference: order.id,
      order_date: order.createdAt,
      additional_order_reference: resource.id,
      end_user_purchase_order_reference: order.createdBy.user.id,
      shipping_store_number: order.store.key,
      test_flag: false,
      currency_code: order.shippingInfo.price.currencyCode,
      items: order.lineItems.map((item) => {
        return {
          retailer_sku_reference: item.variant.sku,
          line_reference: item.productId,
          name: item.name['en-GB'],
          description: 'test description',
          quantity: item.quantity,
          unit_cost_price: (item.totalPrice.centAmount / 100).toFixed(2),
          subtotal: (
            (item.totalPrice.centAmount / 100) *
            item.quantity
          ).toFixed(2),
          tax: (item.taxedPrice.totalNet.centAmount / 100).toFixed(2),
          tax_rate: item.taxRate.amount * 100,
          total: (item.taxedPrice.totalGross.centAmount / 100).toFixed(2),
          promised_date: order.createdAt,
        };
      }),
      shipping_address: {
        full_name: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        line_1: `${order.shippingAddress.streetNumber} ${order.shippingAddress.streetName}`,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        postal_code: order.shippingAddress.postalCode,
        email: order.customerEmail,
        country: order.shippingAddress.country,
        phone: '',
      },
    });
  });
});
