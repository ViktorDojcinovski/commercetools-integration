import axiosClient from '../api/axios-client.api';
import { executeOrderProcess } from '../utils/order.utils';
import { readConfiguration } from '../utils/config.utils';
import { Order, Resource } from '../types/order.types';

/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {Order} order The order received from Pub/Sub message
 * @param {Resource} resource The resource received from Pub/Sub message
 * @returns
 */
const processOrder = async (order: Order, resource: Resource) => {
  const virtualStockApiClient = axiosClient({
    baseURL: readConfiguration().vsApi_v4 as string,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });
  await executeOrderProcess(order, resource, virtualStockApiClient);
};

export { processOrder };
