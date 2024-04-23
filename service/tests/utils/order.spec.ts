import { describe, expect, test, jest } from '@jest/globals';

import { RequestBody, Resource } from '../../src/types/order.types';
import { order } from '../../src/stubs/order.stub';
import { mapOrder } from '../../src/utils/order.utils';

jest.mock('axios');
jest.mock('../../src/client/create.client', () => {
  return jest.requireActual('../../src/__mocks__/createApiRoot');
});

describe('mapOrder util function', () => {
  const body = {
    resource: {
      typeId: 'order',
      obj: order,
    } as unknown as Resource,
  } as unknown as RequestBody;
  test('should return mapped order object', () => {
    expect(
      mapOrder(
        body as unknown as RequestBody,
        `https://www.sandbox.the-edge.io/restapi/v4/suppliers/1569/`,
        // add a Localised string here as a third arg
        [{ 'en-GB': 'test description' }]
      )
    ).toEqual({
      supplier: `https://www.sandbox.the-edge.io/restapi/v4/suppliers/1569/`,
      order_reference: body.resource.obj.id,
      order_date: order.createdAt,
      additional_order_reference: body.resource.typeId,
      end_user_purchase_order_reference: body.resource.obj.createdBy.user.id,
      shipping_store_number: body.resource.obj.store.key,
      test_flag: false,
      items: order.lineItems.map((item) => {
        return {
          currency_code: body.resource.obj.shippingInfo.price.currencyCode,
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
