import axiosClient from '../api/axios-client.api';
import { executeOrderProcess } from '../utils/order.utils';
import { readConfiguration } from '../utils/config.utils';
import { logger } from '../utils/logger.utils';
import { publishMessage } from '../utils/pubSubClient.utils';

/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {string} message The message received from Pub/Sub
 * @returns
 */
const processOrder = async (message: string) => {
  if (!message) {
    logger.info('No message received.');
    await publishMessage('No message recived!');
    return;
  }

  const { resource, order } = JSON.parse(message);

  if (resource.typeId !== 'order') {
    logger.info('Incorrect type.');
    await publishMessage('The only allowed type is order!');
    return;
  }

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
