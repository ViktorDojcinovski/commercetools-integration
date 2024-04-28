import { describe, expect, test, jest } from '@jest/globals';
import Axios from 'axios';

import { order } from '../_stubs/order';
import { executeOrderProcess, mapOrder } from '../../utils/order.utils';
import { RequestBody, Message } from '../../types/order.types';
import { refreshToken } from '../../utils/refreshToken.utils';

jest.mock('axios');
jest.mock('../src/client/create.client', () => {
  return jest.requireActual('../../src/__mocks__/createApiRoot');
});
jest.mock('../src/utils/refreshToken.utils');

const body = {
  message: {
    typeId: 'order',
    obj: order,
  } as unknown as Message,
  typeId: 'order',
} as unknown as RequestBody;

describe('executeOrderProcess util function', () => {
  test('should return data with statusCode 200', async () => {
    const mockResponse = { data: {} };
    (Axios as jest.Mocked<typeof Axios>).post.mockResolvedValue(mockResponse);
    const result = await executeOrderProcess(body, Axios);
    expect(result).toEqual({
      statusCode: 200,
    });
  });
  test('should return data with statusCode 400', async () => {
    const body = {
      message: {
        typeId: 'order',
        obj: {
          ...order,
          lineItems: [{ variant: { availability: {} } }],
        },
      } as unknown as Message,
      typeId: 'order',
    } as unknown as RequestBody;
    const mockResponse = { data: {} };
    (Axios as jest.Mocked<typeof Axios>).post.mockResolvedValue(mockResponse);
    const result = await executeOrderProcess(body, Axios);
    expect(result).toEqual({
      statusCode: 400,
      message: 'A product must have an inventory!',
    });
  });
  test('should throw CustomError on failure', async () => {
    const error = {
      response: {
        status: 500,
        data: {
          error: 'Failed to process the order.',
        },
      },
    };
    (Axios as jest.Mocked<typeof Axios>).post.mockRejectedValue(error);
    await expect(executeOrderProcess(body, Axios)).rejects.toThrow(
      'Failed to process the order.'
    );
  });
  test('should refresh token and post order successfully', async () => {
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
    await executeOrderProcess(body, Axios);
    expect(updatedClient.post).toHaveBeenCalledTimes(1);
  });
  test('should throw CustomError on second failure after 401 status', async () => {
    const error401 = {
      response: {
        status: 401,
        data: {
          error: 'Failed to process the order.',
        },
      },
    };
    const error500 = {
      response: {
        status: 500,
        data: {
          error: 'Failed to process the order.',
        },
      },
    };
    (Axios as jest.Mocked<typeof Axios>).post
      .mockRejectedValueOnce(error401)
      .mockRejectedValueOnce(error500);
    (
      refreshToken as jest.MockedFunction<typeof refreshToken>
    ).mockResolvedValue(Axios);
    await expect(executeOrderProcess(body, Axios)).rejects.toThrow(
      'Failed to refresh the token and to process the order'
    );
  });
  test('should throw CustomError on default case and else block', async () => {
    const error = {
      response: {
        status: 503,
        data: {
          error: 'Unexpected error.',
        },
      },
    };
    (Axios as jest.Mocked<typeof Axios>).post.mockRejectedValue(error);
    await expect(executeOrderProcess(body, Axios)).rejects.toThrow(
      'Unexpected error.'
    );
  });
  test('should handle error without response', async () => {
    const error = {
      response: undefined,
      message: 'Network error',
    };
    (Axios as jest.Mocked<typeof Axios>).post.mockRejectedValue(error);
    await expect(executeOrderProcess(body, Axios)).rejects.toThrow(
      'Internal server error. Please try again later.'
    );
  });
});

describe('mapOrder util function', () => {
  const body = {
    message: {
      typeId: 'order',
      obj: order,
    } as unknown as Message,
  } as unknown as RequestBody;
  test('should return mapped order object', () => {
    expect(
      mapOrder(
        body as unknown as RequestBody,
        `https://www.sandbox.the-edge.io/restapi/v4/suppliers/1569/`,
        [{ 'en-GB': 'test description' }]
      )
    ).toEqual({
      supplier: `https://www.sandbox.the-edge.io/restapi/v4/suppliers/1569/`,
      order_reference: body.message.obj.id,
      order_date: order.createdAt,
      additional_order_reference: body.message.typeId,
      end_user_purchase_order_reference: body.message.obj.createdBy.user.id,
      shipping_store_number: body.message.obj.store.key,
      test_flag: false,
      items: order.lineItems.map((item) => {
        return {
          currency_code: body.message.obj.shippingInfo.price.currencyCode,
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
