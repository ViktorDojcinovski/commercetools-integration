import { Axios } from 'axios';

import { createApiRoot } from '../client/create.client';
import {
  Order,
  Resource,
  LineItem,
  LocalizedString,
} from '../types/order.types';
import { refreshToken } from '../utils/refreshToken.utils';
import { logger } from '../utils/logger.utils';
import { readConfiguration } from './config.utils';

/**
 * Executes the process of network request to
 * client's endpoint (Virtualstock)
 *
 * @param {Order} order The Order object
 * @param {Axios} client The axios client
 */
const executeOrderProcess = async (
  order: Order,
  resource: Resource,
  client: Axios
) => {
  const { lineItems } = order;
  logger.info(`Line items ${JSON.stringify(lineItems)}`);

  if (
    !lineItems[0].variant.availability ||
    !lineItems[0].variant.availability.channels
  ) {
    logger.info('One or more line items are missing channel(supplier)');
    return;
  }
  const supplierRestID = await mapChannel(
    Object.keys(lineItems[0].variant.availability.channels)[0]
  );
  logger.info(`Supplier REST ID: ${JSON.stringify(supplierRestID)}`);
  const extendedProducts = await getExtendedProducts(lineItems);
  const extendedProductsDescriptions = extendedProducts.map((product) => {
    return product.masterData.current.description ?? '';
  });
  const mappedOrder = mapOrder(
    order,
    resource,
    supplierRestID,
    extendedProductsDescriptions as LocalizedString[]
  );
  logger.info(
    `Sending order to Virtualstock... ${JSON.stringify(mappedOrder)}`
  );
  try {
    await client.post('/orders/?format=json', mappedOrder);
    logger.info('Order processed succesfully');
  } catch (error: any) {
    if (error.response) {
      const {
        response: { status },
      } = error;
      logger.info(`Error response: ${JSON.stringify(error.response)}`);
      switch (status) {
        case 401: {
          logger.info('...refreshing token');
          const updatedClient = await refreshToken(client);
          await updatedClient.post('/orders/?format=json', mappedOrder);
          logger.info('Order processed succesfully');
          return;
        }
        default:
          logger.info('Unexpected error occured.');
          return;
      }
    } else {
      logger.info('Unexpected error occured.');
      return;
    }
  }
};

const mapOrder = (
  order: Order,
  resource: Resource,
  supplierRestID: string,
  extendedProductsDescriptions: LocalizedString[]
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
  } = order;

  return {
    supplier: supplierRestID,
    order_reference: id,
    order_date: createdAt,
    additional_order_reference: resource.typeId,
    end_user_purchase_order_reference: createdBy.user.id,
    shipping_store_number: store.key,
    test_flag: false,
    currency_code: shippingInfo.price.currencyCode,
    items: lineItems.map((item: LineItem, i) => {
      return {
        retailer_sku_reference: item.variant.sku,
        line_reference: item.productId,
        name: item.name['en-GB'],
        description:
          extendedProductsDescriptions[i]['en-GB'].substring(0, 255) ||
          'Description unavailable.',
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
      phone: shippingAddress.mobile || shippingAddress.phone || '',
    },
  };
};

const mapChannel = async (channelId: string) => {
  const channel = await createApiRoot()
    .channels()
    .withId({ ID: channelId })
    .get()
    .execute();

  return `${readConfiguration().edgeApi_v4}/suppliers/${channel.body.key}/`;
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

export { executeOrderProcess, mapOrder, mapChannel, getExtendedProducts };
