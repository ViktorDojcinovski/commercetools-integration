import { Request, Response } from 'express';
import { Axios } from 'axios';

import CustomError from '../errors/custom.error';
import axiosClient from '../api/axios-client.api';
import {
  LocalizedString,
  OrderControllerResponse,
  RequestBody,
} from '../types/order.types';
import { virtualStockApi_v4 } from '../consts/virtualstock.const';
import {
  mapOrder,
  mapChannel,
  getExtendedProducts,
} from '../utils/order.utils';
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

  const virtualStockApiClient = axiosClient({
    baseURL: virtualStockApi_v4,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });

  try {
    const data = await orderController(body, virtualStockApiClient);

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
  const { lineItems } = body.resource.obj;

  if (!lineItems[0].variant.availability.channels) {
    return {
      statusCode: 400,
      message: 'A product must have an inventory!',
    };
  }
  const supplierRestID = await mapChannel(
    Object.keys(lineItems[0].variant.availability.channels)[0]
  );
  const extendedProducts = await getExtendedProducts(lineItems);
  const extendedProductsDescriptions = extendedProducts.map((product) => {
    return product.masterData.current.description ?? '';
  });
  const order = mapOrder(
    body,
    supplierRestID,
    extendedProductsDescriptions as LocalizedString[]
  );

  try {
    await client.post('/orders/?format=json', order);
  } catch (error: any) {
    if (error.response) {
      const {
        response: { status },
      } = error;

      switch (status) {
        case 500:
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
            try {
              const response = await client.post('/token', {
                username: process.env.CTP_VS_USERNAME ?? '',
                password: process.env.CTP_VS_PASSWORD ?? '',
              });

              process.env.AUTH_TOKEN = response.data.access;
              process.env.REFRESH_TOKEN = response.data.refresh;

              const virtualStockApiClient = axiosClient({
                baseURL: virtualStockApi_v4,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
                },
              });

              await virtualStockApiClient.post('/orders/?format=json', order);
              break;
            } catch (error: any) {
              throw new CustomError(
                error.response.status,
                'Failed to refresh token or to process the order. Please try again later.',
                error.response.data.error
              );
            }
          }
        }
        default:
          throw new CustomError(status, error.response.data.error);
      }
    } else {
      throw new CustomError(
        500,
        'Internal server error. Please try again later.'
      );
    }
  }
  // const updateAction: UpdateAction = {
  //   action: 'Create',
  //   updateProductData: false,
  // };
  // updateActions.push(updateAction);

  return {
    statusCode: 200,
  };
};

export { post, orderController };
