import { Request, Response } from 'express';
import { Axios } from 'axios';

import { apiSuccess } from '../api/success.api';
import CustomError from '../errors/custom.error';
import axiosClient from '../api/axios-client.api';
import { OrderControllerResponse } from '../types/serviceController.type';

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
  const { resource } = request.body;

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
      baseURL: process.env.VS_API_URL!,
      headers: {
        auth: `${process.env.VS_USERNAME}:${process.env.VS_PASSWORD}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await orderController(resource, virtualStockApiClient);

    if (data && data.statusCode === 200) {
      apiSuccess(200, data.actions, response);
      return;
    }

    throw new CustomError(data ? data.statusCode : 400, JSON.stringify(data));
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
  resource: any,
  client: Axios
): Promise<OrderControllerResponse> => {
  try {
    // TO DO: Map the resource to the virtual stock order API
    const response = await client.post('/order', resource);

    const data = {
      statusCode: 200,
      actions: [],
    };

    return data;
  } catch (error: any) {
    throw new CustomError(500, error.message);
  }
};

export { post, orderController };
