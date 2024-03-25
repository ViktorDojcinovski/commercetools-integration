import { describe, expect, test, jest } from '@jest/globals';

import { RequestBody, Resource } from '../../src/types/order.types';
import { order } from '../../src/stubs/order.stub';
import { mapOrder } from '../../src/utils/order.utils';

jest.mock('axios');

jest.mock('../../src/client/create.client', () => ({
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
