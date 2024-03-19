import { Request, Response } from 'express';
import { Axios } from 'axios';
import { UpdateAction } from '@commercetools/sdk-client-v2';

import { apiSuccess } from '../api/success.api';
import CustomError from '../errors/custom.error';
import axiosClient from '../api/axios-client.api';
import { OrderControllerResponse, RequestBody } from '../types/order.types';
import { virtualStockApi_v4 } from '../consts/virtualstock.const';
import { mapOrder, mapChannel } from '../utils/order.utils';

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
    throw new CustomError(
      400,
      'Bad request - Missing body resource parameter.'
    );
  }

  if (resource.typeId !== 'order') {
    throw new CustomError(400, `Bad request. Allowed value is 'order'.`);
  }

  try {
    const virtualStockApiClient = axiosClient({
      baseURL: virtualStockApi_v4,
      auth: {
        username: process.env.CTP_VS_USERNAME ?? '',
        password: process.env.CTP_VS_PASSWORD ?? '',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await orderController(body, virtualStockApiClient);

    if (data && data.statusCode === 200) {
      apiSuccess(200, data.actions, response);
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(500, error.message);
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
  try {
    const supplierRestID = await mapChannel(
      Object.keys(body.order.lineItems[0].variant.availability.channels)[0]
    );
    const order = mapOrder(body, supplierRestID);
    await client.post('/orders/?format=json', order);
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
  } catch (error: any) {
    throw new CustomError(500, error.message);
  }
};

export { post, orderController };
