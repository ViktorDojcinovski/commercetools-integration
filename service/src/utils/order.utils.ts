import { createApiRoot } from '../client/create.client';
import { edgeApi_v4 } from '../consts/virtualstock.const';
import { LineItem, RequestBody } from '../types/order.types';

import { logger } from '../utils/logger.utils';

const mapOrder = (
  body: RequestBody,
  supplierRestID: string,
  extendedProductsDescriptions: string[]
) => {
  const {
    id,
    createdBy,
    createdAt,
    shippingAddress,
    shippingInfo,
    customerEmail,
    lineItems,
    store,
  } = body.resource.obj;

  logger.info('before extendedProductDescription');
  logger.info(extendedProductsDescriptions);

  return {
    supplier: supplierRestID,
    order_reference: id,
    order_date: createdAt,
    additional_order_reference: body.resource.typeId,
    end_user_purchase_order_reference: createdBy.user.id,
    shipping_store_number: store.key,
    test_flag: false,
    items: lineItems.map((item: LineItem) => {
      return {
        currency_code: shippingInfo.price.currencyCode,
        retailer_sku_reference: item.variant.sku,
        line_reference: item.productId,
        name: item.name['en-GB'],
        quantity: item.quantity,
        unit_cost_price: (item.totalPrice.centAmount / 100).toFixed(2),
        subtotal: ((item.totalPrice.centAmount / 100) * item.quantity).toFixed(
          2
        ),
        tax: (item.taxedPrice.totalNet.centAmount / 100).toFixed(2),
        tax_rate: item.taxRate.amount * 100,
        total: (item.taxedPrice.totalGross.centAmount / 100).toFixed(2),
        promised_date: createdAt,
      };
    }),
    shipping_address: {
      full_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
      line_1: `${shippingAddress.streetNumber} ${shippingAddress.streetName}`,
      city: shippingAddress.city,
      state: shippingAddress.state,
      postal_code: shippingAddress.postalCode,
      email: customerEmail,
      country: shippingAddress.country,
      phone: shippingAddress.mobile || '',
    },
  };
};

const mapChannel = async (channelId: string) => {
  const channel = await createApiRoot()
    .channels()
    .withId({ ID: channelId })
    .get()
    .execute();

  return `${edgeApi_v4}/suppliers/${channel.body.key}/`;
};

const getExtendedProducts = async (lineItems: LineItem[]) => {
  const extendedProductsPromises = lineItems.map((lineItem) => {
    return createApiRoot()
      .products()
      .withId({ ID: lineItem.productId })
      .get()
      .execute();
  });

  const extendedProducts = await Promise.all(extendedProductsPromises);
  const extendedProductsData = extendedProducts.map(
    (exProduct) => exProduct.body
  );

  return extendedProductsData;
};

export { mapOrder, mapChannel, getExtendedProducts };
