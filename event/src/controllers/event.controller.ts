import { Request, Response } from 'express';

import CustomError from '../errors/custom.error';
import axiosClient from '../api/axios-client.api';
import { executeOrderProcess } from '../utils/order.utils';
import { readConfiguration } from '../utils/config.utils';
import { logger } from '../utils/logger.utils';

/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
const processOrder = async (request: Request, response: Response) => {
  // Check request body
  if (!request.body) {
    logger.error('Missing request body.');
    throw new CustomError(400, 'Bad request: No Pub/Sub message was received');
  }

  // Check if the body comes in a message
  if (!request.body.message) {
    logger.error('Missing body message');
    throw new CustomError(400, 'Bad request: Wrong No Pub/Sub message format');
  }
  logger.info(
    JSON.stringify({
      method: request.method,
      url: request.url,
      headers: request.headers,
      body: request.body,
    })
  );

  const { body } = request;
  const orderCreatedMessage = body.message;

  if (!orderCreatedMessage) {
    throw new CustomError(400, 'Bad request. Missing body message parameter.');
  }

  // if (orderCreatedMessage.typeId !== 'order') {
  //   throw new CustomError(400, `Bad request. Allowed value is 'order'.`);
  // }

  const decodedData = orderCreatedMessage.data
    ? Buffer.from(orderCreatedMessage.data, 'base64').toString().trim()
    : undefined;

  logger.info('decodedData');
  logger.info(JSON.stringify(decodedData));
  if (decodedData) {
    const jsonData = JSON.parse(decodedData);
    logger.info(JSON.stringify(jsonData));
  }

  const virtualStockApiClient = axiosClient({
    baseURL: readConfiguration().vsApi_v4 as string,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });

  try {
    const data = await executeOrderProcess(body, virtualStockApiClient);

    if (data && data.statusCode === 200) {
      response.status(data.statusCode);
      return;
    } else if (data && data.statusCode === 400 && data.message) {
      response.status(data.statusCode);
      return response.send(data.message);
    }
  } catch (error: any) {
    if (error instanceof Error) {
      throw new CustomError(
        (error as CustomError).statusCode || 500,
        error.message,
        (error as CustomError).errors
      );
    }
  }
};

export { processOrder };
