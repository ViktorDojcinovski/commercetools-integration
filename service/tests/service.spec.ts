import { describe, expect, test, jest } from '@jest/globals';
import request from 'supertest';
import Axios from 'axios';

import { app } from '../src/app';
import { orderController } from '../src/controllers/service.controller';
import { order } from '../src/stubs/order.stub';
import { RequestBody, Resource } from '../src/types/order.types';
import { mapOrder } from '../src/utils/order.utils';

jest.mock('axios');

jest.mock('../src/client/create.client', () => ({
  createApiRoot: () => {
    return {
      channels: () => {
        return {
          withId: () => ({
            get: () => {
              return {
                execute: () => {
                  return {
                    body: {
                      id: 'channelId',
                      key: 'channelKey',
                    },
                  };
                },
              };
            },
          }),
        };
      },
    };
  },
}));

describe('Service', () => {
  test('has a route handler listening to /service for post requests', async () => {
    const response = await request(app).post('/service').send({});

    expect(response.status).not.toEqual(404);
  });

  test('returns an error if the resource is not provided', async () => {
    const response = await request(app).post('/service').send({
      body: {},
    });

    expect(response.status).toEqual(400);
  });

  test("returns an error if the resource type is not 'order'", async () => {
    const response = await request(app)
      .post('/service')
      .send({
        body: {
          resource: {
            typeId: 'cart',
          },
          order,
        },
      });

    expect(response.status).toEqual(400);
  });

  test('returns an error if the order controller fails', async () => {
    const response = await request(app)
      .post('/service')
      .send({
        resource: {
          typeId: 'order',
        },
        order,
      });

    expect(response.status).toEqual(500);
  });

  test('returns a success response if the order controller succeeds', async () => {
    jest.doMock('../src/api/axios-client.api', () => ({
      __esModule: true,
      default: () => ({
        post: jest.fn<() => Promise<any>>().mockResolvedValue({ data: {} }),
      }),
    }));
    jest.resetModules();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { app } = require('../src/app');

    const response = await request(app)
      .post('/service')
      .send({
        resource: {
          typeId: 'order',
        },
        order,
      });

    expect(response.status).toEqual(200);
  });
});

describe('orderController util function', () => {
  test('should return data with statusCode 200', async () => {
    const body = {
      resource: {
        typeId: 'order',
      } as unknown as Resource,
      typeId: 'order',
      order,
    } as unknown as RequestBody;
    const mockResponse = { data: {} };
    (Axios as jest.Mocked<typeof Axios>).post.mockResolvedValue(mockResponse);
    const result = await orderController(body, Axios);
    expect(result).toEqual({
      statusCode: 200,
      actions: [
        {
          action: 'dispatchOrderToVirtualStock',
          updateProductData: false,
        },
      ],
    });
  });
  test('should throw CustomError on failure', async () => {
    const body = {
      resource: {
        typeId: 'order',
      } as unknown as Resource,
      typeId: 'order',
      order,
    } as unknown as RequestBody;
    const error = new Error('Network error');
    (Axios as jest.Mocked<typeof Axios>).post.mockRejectedValue(error);
    await expect(orderController(body, Axios)).rejects.toThrow('Network error');
  });
});

describe('mapOrder util function', () => {
  const body = {
    resource: {
      typeId: 'order',
    } as unknown as Resource,
    order,
  } as unknown as RequestBody;
  test('should return mapped order object', () => {
    expect(
      mapOrder(
        body as unknown as RequestBody,
        `https://www.sandbox.the-edge.io/restapi/v4/suppliers/1569/`
      )
    ).toEqual({
      supplier: `https://www.sandbox.the-edge.io/restapi/v4/suppliers/1569/`,
      order_reference: body.order.id,
      order_date: order.createdAt,
      additional_order_reference: body.resource.typeId,
      end_user_purchase_order_reference: body.order.createdBy.user.id,
      shipping_store_number: body.order.store.key,
      items: order.lineItems.map((item) => {
        return {
          currency_code: body.order.shippingInfo.price.currencyCode,
          retailer_sku_reference: item.variant.sku,
          line_reference: item.productId,
          name: item.name['en-GB'],
          quantity: item.quantity,
          unit_cost_price: (item.totalPrice.centAmount / 100).toFixed(2),
          subtotal: (
            (item.totalPrice.centAmount / 100) *
            item.quantity
          ).toFixed(2),
          tax: (item.taxedPrice.totalNet.centAmount / 100).toFixed(2),
          tax_rate: item.taxRate.amount * 100,
          total: (item.taxedPrice.totalGross.centAmount / 100).toFixed(2),
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
      },
      promised_date: order.createdAt,
    });
  });
});
