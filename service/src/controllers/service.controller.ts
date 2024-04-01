import { Request, Response } from 'express';
import { Axios } from 'axios';
import { UpdateAction } from '@commercetools/sdk-client-v2';

import { apiSuccess } from '../api/success.api';
import CustomError from '../errors/custom.error';
import axiosClient from '../api/axios-client.api';
import { OrderControllerResponse, RequestBody } from '../types/order.types';
import { virtualStockApi_v4 } from '../consts/virtualstock.const';
import { mapOrder, mapChannel } from '../utils/order.utils';
import { refreshToken } from '../utils/refreshToken.utils';
import { logger } from '../utils/logger.utils';

/**
 * Exposed service endpoint.
 * - Receives a POST request, parses the action and the controller
 * and returns it to the correct controller. We should be use 3. `Cart`, `Order` and `Payments`
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
const post = async (request: Request, response: Response) => {
  const { body } = request;
  const { resource } = body;

  if (!resource) {
    throw new CustomError(400, 'Bad request. Missing body resource parameter.');
  }

  if (resource.typeId !== 'order') {
    throw new CustomError(400, `Bad request. Allowed value is 'order'.`);
  }
  //LOGGER
  logger.info('Order received: ', JSON.stringify(body));
  logger.info('virtualStockApi_v4: ', virtualStockApi_v4);
  logger.info('process.env.AUTH_TOKEN: ', process.env.AUTH_TOKEN);

  const virtualStockApiClient = axiosClient({
    baseURL: virtualStockApi_v4,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });

  logger.info('virtualStockApiClient: ', virtualStockApiClient);

  try {
    const data = await orderController(body, virtualStockApiClient);

    if (data && data.statusCode === 200) {
      apiSuccess(data.statusCode, data.actions, response);
      return;
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

/**
 *
 * @param resource
 * @param client
 * @returns OrderControllerResponse
 */
const orderController = async (
  body: RequestBody,
  client: Axios
): Promise<OrderControllerResponse> => {
  const updateActions: Array<UpdateAction> = [];
  //LOGGER
  logger.info('Before mapChannel');
  logger.info(JSON.stringify(body.order));
  logger.info(body.order.lineItems[0]);
  logger.info(body.order.lineItems[0].variant);
  logger.info(body.order.lineItems[0].variant.availability);
  logger.info(body.order.lineItems[0].variant.availability.channels);
  const supplierRestID = await mapChannel(
    Object.keys(body.order.lineItems[0].variant.availability.channels)[0]
  );
  //LOGGER
  logger.info('After mapChannel', supplierRestID);
  const order = mapOrder(body, supplierRestID);

  //LOGGER
  logger.info('Order mapped: ', JSON.stringify(order));

  try {
    await client.post('/orders/?format=json', order);
  } catch (error: any) {
    //LOGGER
    logger.error('Error processing order (inside catch block): ', error);
    if (error.response) {
      const {
        response: { status },
      } = error;

      switch (status) {
        case 500:
          logger.error(
            'error.response.data.error: ',
            JSON.stringify(error.response.data.error)
          );
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
              error.response.status,
              'Failed to refresh token or to process the order. Please try again later.',
              error.response.data.error
            );
          }
        }
        default:
          throw new CustomError(status, error.response.data.error);
      }
    } else {
      //LOGGER
      logger.error('Error processing order (inside else block): ', error);
      throw new CustomError(
        500,
        'Internal server error. Please try again later.'
      );
    }
  }
  const updateAction: UpdateAction = {
    action: 'dispatchOrderToVirtualStock',
    updateProductData: false,
  };
  updateActions.push(updateAction);

  const data = {
    statusCode: 200,
    actions: updateActions,
  };

  return data;
};

export { post, orderController };
