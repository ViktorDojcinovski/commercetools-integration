import { Axios } from 'axios';

import CustomError from '../errors/custom.error';
import { createApiRoot } from '../client/create.client';
import {
  Order,
  LineItem,
  LocalizedString,
  OrderControllerResponse,
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
 * @returns {Promise<OrderControllerResponse>} OrderControllerResponse
 */
const executeOrderProcess = async (
  order: Order,
  client: Axios
): Promise<OrderControllerResponse> => {
  const { lineItems } = order;

  if (!lineItems[0].variant.availability.channels) {
    throw new CustomError(400, 'A product must have an inventory!');
  }
  const supplierRestID = await mapChannel(
    Object.keys(lineItems[0].variant.availability.channels)[0]
  );
  const extendedProducts = await getExtendedProducts(lineItems);
  const extendedProductsDescriptions = extendedProducts.map((product) => {
    return product.masterData.current.description ?? '';
  });
  const mappedOrder = mapOrder(
    order,
    supplierRestID,
    'aditional_ref002',
    extendedProductsDescriptions as LocalizedString[]
  );

  try {
    const res = await client.post('/orders/?format=json', mappedOrder);
    logger.info('res');
    logger.info(res);
  } catch (error: any) {
    if (error.response) {
      const {
        response: { status },
      } = error;

      switch (status) {
        case 500:
          logger.info('500');
          logger.info(JSON.stringify(error.response.data.error));
          logger.info(JSON.stringify(mappedOrder));
          throw new CustomError(
            500,
            'Failed to process the order.',
            error.response.data.error
          );
        case 401: {
          logger.info('...refreshing token');
          try {
            const updatedClient = await refreshToken(client);
            await updatedClient.post('/orders/?format=json', order);

            break;
          } catch (error: any) {
            throw new CustomError(
              status,
              'Failed to refresh the token and to process the order'
            );
          }
        }
        default:
          logger.info('default');
          logger.info(status);
          throw new CustomError(status, error.response.data.error);
      }
    } else {
      logger.info('else');
      throw new CustomError(
        500,
        'Internal server error. Please try again later.'
      );
    }
  }

  return {
    statusCode: 200,
  };
};

const mapOrder = (
  order: Order,
  supplierRestID: string,
  additionalOrderReference: string,
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
    additional_order_reference: additionalOrderReference,
    end_user_purchase_order_reference: createdBy.user.id,
    shipping_store_number: store.key,
    test_flag: false,
    items: lineItems.map((item: LineItem, i) => {
      return {
        currency_code: shippingInfo.price.currencyCode,
        retailer_sku_reference: item.variant.sku,
        line_reference: item.productId,
        name: item.name['en-GB'],
        description: extendedProductsDescriptions[i]['en-GB'].substring(0, 255),
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
